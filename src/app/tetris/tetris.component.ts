import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TetrisService } from '../model/tetris.service';
import { __importDefault } from 'tslib';

@Component({
  //selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit, AfterViewInit {

  constructor(private tetrisService: TetrisService) { }

  private tetrisDrawTimer = null;

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

  }

  //绘制正在下落的俄罗斯方块
  private drawFallenTetris() {

  }

  private generateFallenTetris() {
    let tetrisContain = <HTMLCanvasElement>document.getElementById("tetrisCanvas");

    let fallenTetris = this.tetrisService.getInitFallenTetris();

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
    }
  }

  ngOnInit() {
    // fromEvent(window, 'onload')
    //   .subscribe(res => {
    //     console.log(`页面加载完成：${res.target}`);

    //     this.initTetrisCanvas();
    //   });
  };

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
    this.initTetrisCanvas();
  }

  stopGame() {
    console.log(`${new Date()}:结束游戏`);

    if (this.tetrisDrawTimer != null) {
      window.clearInterval(this.tetrisDrawTimer);
    }
  }

  startGame() {
    console.log(`${new Date()}:启动游戏，游戏参数：速度-${this.tetrisService.tetrisCurrentSpeed}`);
    if (this.tetrisDrawTimer != null) {
      window.clearInterval(this.tetrisDrawTimer);
    }

    this.tetrisDrawTimer = window.setInterval(() => {
      this.drawTetris();
    }, 1000);
  }
}