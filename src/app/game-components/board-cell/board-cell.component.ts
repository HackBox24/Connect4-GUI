import {Component, Input, OnInit} from '@angular/core';
import {PlayerColor} from '../../enums/player-color.enum';
import {GameModel} from '../../models/game-model';
import {Observable} from 'rxjs/Observable';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit {

  @Input() x: number;

  @Input() y: number;

  @Input() $game: Observable<GameModel>;

  @Input() player: string;

  checkerColor: Observable<PlayerColor>;

  constructor(
    private games: GameService
  ) { }

  ngOnInit() {
    this.checkerColor = this.$game.map(game => {
      const player = game.board[this.y][this.x];
      if (player) {
        return game[`${player}Color`];
      } else {
        return null;
      }
    });
  }

  dropChecker(game: GameModel) {
    this.games.playTurn(game, this.player, this.x);
  }

}
