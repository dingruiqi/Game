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
