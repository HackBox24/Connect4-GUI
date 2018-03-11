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

  $game: Observable<GameModel | null>;

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
