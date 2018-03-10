import { Component, OnInit } from '@angular/core';
import {PlayerColor} from '../../enums/player-color.enum';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {share} from 'rxjs/operators';
import {GameService} from '../../services/game.service';
import {GameModel} from '../../models/game-model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  $game = Observable<GameModel | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private games: GameService
  ) { }

  ngOnInit() {
    this.$game = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.games.get(params.get('id'))
          .pipe(share());
      });
  }

}

const GAME = {
  code: 'hjx21',
  player1: 'player1',
  player1Color: PlayerColor.Red,
  player2: 'player2',
  player2Color: PlayerColor.Green,
  player3: null,
  player3Color: null,
  player4: null,
  player4Color: null,
  player_count: 2,
  players: ['player1', 'player2'],
  board: {
    1: {
      1: null,
      2: 'player1',
      3: null,
      4: 'player2',
      5: 'player1',
      6: null,
      7: null,
    },
    2: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
    },
    3: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
    },
    4: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
    },
    5: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
    },
    6: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
    }
  }
};
