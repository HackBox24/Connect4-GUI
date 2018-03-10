import {Component, Input, OnInit} from '@angular/core';
import {PlayerColor} from '../../enums/player-color.enum';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit {

  @Input() x: number;

  @Input() y: number;

  checkerColor = PlayerColor.Red;

  constructor() { }

  ngOnInit() {
  }

}
