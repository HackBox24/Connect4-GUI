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
      code: id,
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

  playTurn(game: GameModel, player: string, column: number) {
    console.log(game.code, player, column);
    if (game.turn === player) {
      const row = newCheckerPosition(game, column);
      if (row === false) {
        return false;
      }
      const nextTurn = nextPlayerTurn(player, game.players.length);
      console.log(player, ' has dropped a checker at (', column, ',', row, ') in game ', game.code, '\nThe next player is ', nextTurn);
      const newData = game;
      newData.board[row][column] = player;
      newData.turn = nextTurn;
      this.db.doc(`games/${game.code}`).set(newData)
        .catch(error => console.error(error));
    }
  }
}

const won = (x: number, y: number, game: GameModel, player: string) => {
};

const determineDirections = (x: number, y: number, game: GameModel, player: string): string[] => {
  const directions = [];

  // Check up
  if (game.board[y + 1] !== undefined && game.board[y + 1][x] === player) {
    directions.push('up');
  }

  // Check Down
  if (game.board[y - 1] !== undefined && game.board[y - 1][x] === player) {
    directions.push('down');
  }

  // Check right
  if (game.board[x + 1] !== undefined && game.board[y][x + 1] === player) {
    directions.push('right');
  }

  // Check left
  if (game.board[x - 1] !== undefined && game.board[y][x - 1] === player) {
    directions.push('left');
  }

  if (game.board[y + 1] !== undefined && game.board[x + 1] !== undefined && game.board[y + 1][x + 1] === player) {
    directions.push('up right');
  }

  if (game.board[y + 1] !== undefined && game.board[x - 1] !== undefined && game.board[y + 1][x - 1] === player) {
    directions.push('up left');
  }

  if (game.board[y - 1] !== undefined && game.board[x + 1] !== undefined && game.board[y - 1][x + 1] === player) {
    directions.push('down right');
  }

  if (game.board[y - 1] !== undefined && game.board[x - 1] !== undefined && (game.board[y - 1][x - 1] === player) {
    directions.push('down left');
  }

  return directions;
};

const nextPlayerTurn = (player: string, player_count: number) => {
  switch (player) {
    case 'player1':
      if (player_count === 1) {
        return 'player1';
      }
      return 'player2';

    case 'player2':
      if (player_count === 2) {
        return 'player1';
      }
      return 'player3';

    case 'player3':
      if (player_count === 3) {
        return 'player1';
      }
      return 'player4';

    case 'player4':
      return 'player1';

    default:
      return player;
  }
};

const newCheckerPosition = (game: GameModel, column: number): number | false => {
  if (game.board[1][column] === null) {
    return 1;
  } else if (game.board[2][column] === null) {
    return 2;
  } else if (game.board[3][column] === null) {
    return 3;
  } else if (game.board[4][column] === null) {
    return 4;
  } else if (game.board[5][column] === null) {
    return 5;
  } else if (game.board[6][column] === null) {
    return 6;
  } else {
    return false;
  }
};

const makeID = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz1234567890';
  // 😁😂😃😄😅😆😉😊😋😌😍😏😒😓😔😖😘😚😜😝😞😠😡😢😣😤😥😨😩😪😫😭😰😱😲😳😵😷😸😹😺😻😼😽😾😿🙀🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
