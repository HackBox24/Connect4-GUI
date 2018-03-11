import {PlayerColor} from '../enums/player-color.enum';

export interface GameModel {
  code: string[6]; // This is al the game's UID
  player1: string | null;
  player1Color: PlayerColor | null;
  player2: string | null;
  player2Color: PlayerColor | null;
  player3: string | null;
  player3Color: PlayerColor | null;
  player4: string | null;
  player4Color: PlayerColor | null;
  player_count: number;
  turn: string;
  players: string[];
  board: {
    1: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    },
    2: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    },
    3: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    },
    4: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    },
    5: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    },
    6: {
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
      6: string | null;
      7: string | null;
    }
  };
}
