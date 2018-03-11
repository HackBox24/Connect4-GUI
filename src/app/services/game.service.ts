import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {GameModel} from '../models/game-model';
import {PlayerColor} from '../enums/player-color.enum';
import {take, tap} from 'rxjs/operators';

@Injectable()
export class GameService {

  public $game: Observable<GameModel | null>;

  player_no: string;

  constructor(
    private db: AngularFirestore
  ) {
    this.$game = Observable.of(null);
  }

  get(id: string) {
    this.$game = this.db.doc<GameModel>(`games/${id}`).valueChanges();
    return this.$game;
  }

  create(player1: string) {
    const id = makeID();
    return this.db.doc(`games/${id}`).set({
      code: 'hjx21',
      player1: player1,
      player1Color: PlayerColor.Red,
      player2: null,
      player2Color: PlayerColor.Green,
      player3: null,
      player3Color: PlayerColor.Yellow,
      player4: null,
      player4Color: PlayerColor.Blue,
      player_count: 2,
      players: [player1],
      turn: 'player1',
      board: {
        1: {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
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
    })
      .then(() => Promise.resolve(id));
  }

  join(game_id: string, player: string) {
    const game = this.db.doc<GameModel>(`games/${game_id}`);
    return game.valueChanges()
      .pipe(
        tap(base => {
          if (!base.players.includes(player) && base.players.length < 5) {
            const new_game = base as GameModel;
            const new_player_no = `player${base.players.length + 1}`;
            this.player_no = new_player_no;
            new_game[new_player_no] = player;
            new_game.players.push(player);
            game.set(new_game);
          } else {
            if (base.player1 === player) {
              this.player_no = 'player1';
            } else if (base.player2 === player) {
              this.player_no = 'player2';
            } else if (base.player3 === player) {
              this.player_no = 'player3';
            } else if (base.player4 === player) {
              this.player_no = 'player4';
            }
          }
      })
    );
  }

}

const makeID = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz1234567890';
  // 😁😂😃😄😅😆😉😊😋😌😍😏😒😓😔😖😘😚😜😝😞😠😡😢😣😤😥😨😩😪😫😭😰😱😲😳😵😷😸😹😺😻😼😽😾😿🙀🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
