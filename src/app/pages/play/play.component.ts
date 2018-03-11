import { Component, OnInit } from '@angular/core';
import {PlayerColor} from '../../enums/player-color.enum';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {share, tap} from 'rxjs/operators';
import {GameService} from '../../services/game.service';
import {GameModel} from '../../models/game-model';
import {AuthService} from '../../services/auth.service';
import {observable} from 'rxjs/symbol/observable';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  $game: Observable<GameModel | null>;

  $authState: Observable<any | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private games: GameService,
    private afa: AuthService
  ) { }

  ngOnInit() {
    this.$game = this.afa.authState
      .switchMap(authState => {
        if (authState !== null) {
          return this.route.paramMap
            .switchMap((params: ParamMap) => {
              return this.games.join(params.get('id'), authState.uid);
          });
        } else {
          this.afa.login()
            .catch(error => console.error(error));
          return null;
        }
      });
  }

}
