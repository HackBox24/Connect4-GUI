import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit {

  @Input() x: number;

  @Input() y: number;

  constructor() { }

  ngOnInit() {
  }

}
