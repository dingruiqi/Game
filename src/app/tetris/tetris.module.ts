import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TetrisComponent } from './tetris.component';
import { FormsModule } from '@angular/forms';

let routing = RouterModule.forChild([
  { path: "tetrisGame", component: TetrisComponent },
  { path: "**", redirectTo: "tetrisGame" }
]);

@NgModule({
  declarations: [TetrisComponent],
  imports: [
    CommonModule, routing, FormsModule
  ]
})
export class TetrisModule { }
