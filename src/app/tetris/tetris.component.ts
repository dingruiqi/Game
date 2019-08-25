import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TetrisService } from '../model/tetris.service';
import { __importDefault } from 'tslib';
import { NoBlock, tetrisCol, tetrisRow } from '../model/tetris.model';
import { fromEvent } from 'rxjs';

@Component({
  //selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit, AfterViewInit {

  constructor(private tetrisService: TetrisService) { }

  private tetrisDrawTimer = null;

  private isPlaying: boolean = false;

  private initTetrisCanvas() {
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");
    let canvasSize = this.tetrisService.getTetrisCanvasSize(tetrisContain.clientWidth);
    tetrisContain.width = canvasSize.width;
    tetrisContain.height = canvasSize.height;
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");
    //开始绘制路径
    tetrisCtx.beginPath();

    let rowCount = this.tetrisService.tetrisRowCount;
    let colCount = this.tetrisService.tetrisColCount;
    let cellWidth = this.tetrisService.tetrisCellWidth;
    //绘制横向网格对应的路径
    for (let index = 1; index < rowCount; index++) {
      tetrisCtx.moveTo(0, index * cellWidth);
      tetrisCtx.lineTo(colCount * cellWidth, index * cellWidth);
    }
    //绘制纵向网格对应的路径
    for (let index = 1; index < colCount; index++) {
      tetrisCtx.moveTo(index * cellWidth, 0);
      tetrisCtx.lineTo(index * cellWidth, rowCount * cellWidth);
    }

    tetrisCtx.closePath();

    //设置颜色
    tetrisCtx.strokeStyle = "#aaa";
    //设置线宽
    tetrisCtx.lineWidth = 0.3;
    //绘制
    tetrisCtx.stroke();
  }

  //绘制固定的俄罗斯方块，不包括正在下落的方块
  private drawFixTetris() {
    let rowCount = this.tetrisService.tetrisRowCount;
    let colCount = this.tetrisService.tetrisColCount;
    let cellWidth = this.tetrisService.tetrisCellWidth;

    let allFixTetris = this.tetrisService.getFixTetris();

    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");

    //先处理消行
    console.warn("尚未实现消行的功能！");

    //所有格子变白
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {

        if (allFixTetris[row][col] != NoBlock) {
          tetrisCtx.fillStyle = allFixTetris[row][col];
        }
        else {
          tetrisCtx.fillStyle = 'white';

        }
        let x = col * cellWidth;
        let y = row * cellWidth;
        tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
      }
    }

    //再处理画消行后的块
    // for (let index = 0; index < allFixTetris.length; index++) {
    //   tetrisCtx.fillStyle = allFixTetris[index].color;
    //   let x = allFixTetris[index].x * cellWidth;
    //   let y = allFixTetris[index].y * cellWidth;
    //   tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    // }


  }

  //绘制正在下落的俄罗斯方块
  private drawFallenTetris() {
    // let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");

    // let fallenTetris = this.tetrisService.initFallenTetris();

    // let cellWidth = this.tetrisService.tetrisCellWidth;
    // //获取API
    // let tetrisCtx = tetrisContain.getContext("2d");

    // for (let index = 0; index < fallenTetris.length; index++) {
    //   tetrisCtx.fillStyle = fallenTetris[index].color;
    //   let x = fallenTetris[index].x * cellWidth;
    //   let y = fallenTetris[index].y * cellWidth;
    //   tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    // }
  }

  private generateFallenTetris() {
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");

    let fallenTetris = this.tetrisService.initFallenTetris();

    let rowCount = this.tetrisService.tetrisRowCount;
    let colCount = this.tetrisService.tetrisColCount;
    let cellWidth = this.tetrisService.tetrisCellWidth;
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");

    for (let index = 0; index < fallenTetris.length; index++) {
      tetrisCtx.fillStyle = fallenTetris[index].color;
      let x = fallenTetris[index].x * cellWidth;
      let y = fallenTetris[index].y * cellWidth;
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }
  }

  //后台线程，不停的检查当前的方块情况，如果
  private drawTetris() {

    //console.log("ssaaaaaaaaaaaaa");

    if (this.tetrisService.hasFallenTetris) {
      //有正在下落
      this.drawFallenTetris();
    }
    else {
      this.drawFixTetris();

      this.generateFallenTetris();
      //this.tetrisService.initFallenTetris();
    }
  }

  ngOnInit() {
    fromEvent(window, 'keydown')
      .subscribe((res: KeyboardEvent) => {
        console.log(`监听按钮：${res.keyCode}`);
        this.processKeyDown(res.keyCode);
      });
  };

  private moveFallenTetrisDown() {
    //判断有没有下落的方块
    if (!this.tetrisService.hasFallenTetris) {
      return;
    }

    //判断下边有没有东西
    let fallenTetris = this.tetrisService.getFallenTetris();
    let maxY = Math.max.apply(Math, fallenTetris.map(t => t.y));
    if (maxY == tetrisRow - 1) {
      //边界

      //固定
      this.tetrisService.fixFallenTetris();

      return;
    }

    let allFixTetris = this.tetrisService.getFixTetris();
    //固定块的碰撞判断
    let find = fallenTetris.find(t => {
      if (t.y == maxY) {
        if (allFixTetris[t.y + 1][t.x] != NoBlock) {
          return true;
        }
      }

      return false;
    });
    if (find != null) {
      this.tetrisService.fixFallenTetris();
      return;
    }

    let cellWidth = this.tetrisService.tetrisCellWidth;
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");

    //将原来位置的置白
    for (let index = 0; index < fallenTetris.length; index++) {
      let x = fallenTetris[index].x * cellWidth;
      let y = fallenTetris[index].y * cellWidth;
      tetrisCtx.fillStyle = 'white';
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }

    for (let index = 0; index < fallenTetris.length; index++) {
      let x = fallenTetris[index].x * cellWidth;
      let y = (++fallenTetris[index].y) * cellWidth;

      tetrisCtx.fillStyle = fallenTetris[index].color;
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }
  }

  private moveFallenTetrisRight() {
    //判断有没有下落的方块
    if (!this.tetrisService.hasFallenTetris) {
      return;
    }

    //判断右边有没有东西
    let fallenTetris = this.tetrisService.getFallenTetris();
    let maxX = Math.max.apply(Math, fallenTetris.map(t => t.x));
    if (maxX == tetrisCol - 1) {
      //边界
      return;
    }

    let allFixTetris = this.tetrisService.getFixTetris();
    //固定块的碰撞判断
    fallenTetris.forEach(t => {
      if (t.x == maxX) {
        if (allFixTetris[t.x + 1][t.y] != NoBlock) {
          return;
        }
      }
    })

    let cellWidth = this.tetrisService.tetrisCellWidth;
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");

    //将原来位置的置白
    for (let index = 0; index < fallenTetris.length; index++) {
      let x = fallenTetris[index].x * cellWidth;
      let y = fallenTetris[index].y * cellWidth;
      tetrisCtx.fillStyle = 'white';
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }

    for (let index = 0; index < fallenTetris.length; index++) {
      let x = (++fallenTetris[index].x) * cellWidth;
      let y = fallenTetris[index].y * cellWidth;

      tetrisCtx.fillStyle = fallenTetris[index].color;
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }
  }

  private moveFallenTetrisLeft() {
    //判断有没有下落的方块
    if (!this.tetrisService.hasFallenTetris) {
      return;
    }

    //判断左边有没有东西
    let fallenTetris = this.tetrisService.getFallenTetris();
    let minX = Math.min.apply(Math, fallenTetris.map(t => t.x));
    if (minX == 0) {
      //边界
      return;
    }

    let allFixTetris = this.tetrisService.getFixTetris();
    //固定块的碰撞判断
    fallenTetris.forEach(t => {
      if (t.x == minX) {
        if (allFixTetris[t.x - 1][t.y] != NoBlock) {
          return;
        }
      }
    })

    let cellWidth = this.tetrisService.tetrisCellWidth;
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");
    //获取API
    let tetrisCtx = tetrisContain.getContext("2d");

    //将原来位置的置白
    for (let index = 0; index < fallenTetris.length; index++) {
      let x = fallenTetris[index].x * cellWidth;
      let y = fallenTetris[index].y * cellWidth;
      tetrisCtx.fillStyle = 'white';
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }

    for (let index = 0; index < fallenTetris.length; index++) {
      let x = (--fallenTetris[index].x) * cellWidth;
      let y = fallenTetris[index].y * cellWidth;

      x = fallenTetris[index].x * cellWidth;
      tetrisCtx.fillStyle = fallenTetris[index].color;
      tetrisCtx.fillRect(x + 1, y + 1, cellWidth - 2, cellWidth - 2);
    }
  }

  private processKeyDown(keyCode: number) {
    switch (keyCode) {
      case 37:
        //向左
        if (!this.isPlaying) {
          return;
        }
        this.moveFallenTetrisLeft();
        break;
      case 39:
        //向右
        if (!this.isPlaying) {
          return;
        }

        this.moveFallenTetrisRight();
        break;

      case 40:
        //向下
        if (!this.isPlaying) {
          return;
        }

        this.moveFallenTetrisDown();
        break;
      default:
        break;
    }
  }

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
    this.initTetrisCanvas();
  }

  stopGame() {
    console.log(`${new Date()}:结束游戏`);
    this.isPlaying = false;
    if (this.tetrisDrawTimer != null) {
      window.clearInterval(this.tetrisDrawTimer);
    }
  }

  startGame() {
    console.log(`${new Date()}:启动游戏，游戏参数：速度-${this.tetrisService.tetrisCurrentSpeed}`);

    this.isPlaying = true;

    if (this.tetrisDrawTimer != null) {
      window.clearInterval(this.tetrisDrawTimer);
    }

    this.tetrisDrawTimer = window.setInterval(() => {
      this.drawTetris();
    }, 1000);
  }
}