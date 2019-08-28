import { Injectable } from '@angular/core';
import { Tetris } from './tetris.model';

@Injectable({
  providedIn: 'root'
})
export class TetrisService {

  private tetris: Tetris = new Tetris();

  constructor() { }

  public getTetrisCanvasSize(canvasWidth: number): { width: number; height: number } {
    let cellWidth = canvasWidth / this.tetris.tetrisColCount;
    this.tetris.tetrisCellWidth = cellWidth;
    let size = {
      width: canvasWidth,
      height: cellWidth * this.tetris.tetrisRowCount
    };

    return size;
  }

  recordMaxScore(score?: number) {
    this.tetris.recordMaxScore(score);
  }

  removeFixTetrisRow(row?: number) {
    return this.tetris.removeFixTetrisRow(row);
  }

  getFixTetris(): [][] {
    return this.tetris.getFixTetris();
  }

  initFallenTetris(): [{ x: number, y: number, color: string },
    { x: number, y: number, color: string },
    { x: number, y: number, color: string },
    { x: number, y: number, color: string },] {

    this.tetris.initFallTetris();

    return this.tetris.getFallTetris();
  }

  //判断是否可以变形
  canFallenTetrisChangeDirection(): boolean {
    return this.tetris.canFallenTetrisChangeDirection();
  }

  changeFallenTetrisDirection() {
    this.tetris.changeFallenTetrisDirection();
  }

  //固定所有下落方块
  fixFallenTetris() {
    this.tetris.changeFallenTetrisToFixTetris();
  }

  getFallenTetris(): [{ x: number, y: number, color: string },
    { x: number, y: number, color: string },
    { x: number, y: number, color: string },
    { x: number, y: number, color: string },] {

    return this.tetris.getFallTetris();
  }

  initTetris() {
    this.tetris.clearFallTetris();
    this.tetris.clearFixTetris();
    this.tetris.currentScore = 0;
    this.tetris.currentSpeed = 0;
  }

  get hasFallenTetris(): boolean {
    return this.tetris.hasFallenTetris;
  }

  get tetrisCurrentSpeed(): number {
    return this.tetris.currentSpeed;
  }

  set tetrisCurrentSpeed(speed: number) {
    this.tetris.currentSpeed = speed;
  }

  get tetrisCurrentScore(): number {
    return this.tetris.currentScore;
  }

  get tetrisMaxScore(): number {
    return this.tetris.maxScore;
  }

  get tetrisRowCount(): number {
    return this.tetris.tetrisRowCount;
  }

  get tetrisColCount(): number {
    return this.tetris.tetrisColCount;
  }

  get tetrisCellWidth(): number {
    return this.tetris.tetrisCellWidth;
  }

  // set tetrisCellWidth(cellWidth:number){
  //   this.tetris.tetrisCellWidth = cellWidth;
  // }
}
