import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TetrisService } from '../model/tetris.service';

@Component({
  //selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit, AfterViewInit {

  constructor(private tetrisService: TetrisService) { }

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
}