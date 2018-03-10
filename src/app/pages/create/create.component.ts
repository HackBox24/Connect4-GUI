import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {PlayerColor} from '../../enums/player-color.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    const id = makeID();
    this.db.doc(`games/${id}`).set({
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
      .then(() => this.router.navigate(['play', id]))
      .catch(error => console.error(error));
  }

}

function makeID() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
