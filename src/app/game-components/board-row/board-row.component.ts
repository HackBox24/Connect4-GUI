import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.css']
})
export class BoardRowComponent implements OnInit {

  @Input() y: number;

  rowClass = 'normal-row';

  constructor() { }

  ngOnInit() {
    if (this.y === 6) {
      this.rowClass = 'top-row';
    } else if (this.y === 1) {
      this.rowClass = 'bottom-row';
    } else {
      this.rowClass = 'normal-row';
    }
  }

}
