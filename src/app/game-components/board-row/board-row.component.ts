import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.css']
})
export class BoardRowComponent implements OnInit {

  @Input() y: number;

  constructor() { }

  ngOnInit() {
  }

}
