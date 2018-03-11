import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {PlayerColor} from '../../enums/player-color.enum';
import {Router} from '@angular/router';
import {GameService} from '../../services/game.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private games: GameService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.login();
    this.auth.authState
      .subscribe(authState => {
        console.log(authState);
        if (authState !== null) {
          this.games.create(authState.uid)
            .then(game => this.router.navigate(['play', game]))
            .catch(error => console.error(error));
        }
      });
  }

}
