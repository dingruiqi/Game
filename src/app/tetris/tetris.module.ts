import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TetrisComponent } from './tetris.component';

let routing = RouterModule.forChild([
  { path: "tetrisGame", component: TetrisComponent },
  { path: "**", redirectTo: "tetrisGame" }
]);

@NgModule({
  declarations: [TetrisComponent],
  imports: [
    CommonModule, routing
  ]
})
export class TetrisModule { }
