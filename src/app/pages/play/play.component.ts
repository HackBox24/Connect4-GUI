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

  player_no: string;

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
              this.player_no = this.games.player_no;
              const joined = this.games.join(params.get('id'), authState.uid);
              console.log(this.player_no);
              return joined;
          });
        } else {
          this.afa.login()
            .catch(error => console.error(error));
          return null;
        }
      });
  }

}
