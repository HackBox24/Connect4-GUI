import {Component, Input, OnInit} from '@angular/core';
import {GameModel} from '../../models/game-model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() $game: Observable<GameModel>;

  @Input() player: string;

  constructor() { }

  ngOnInit() {
  }

}
