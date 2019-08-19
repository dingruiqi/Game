import { Component, OnInit } from '@angular/core';
import { Tetris } from '../model/tetris.model';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  constructor(private tetris: Tetris) { }

  ngOnInit() {
  }

}
