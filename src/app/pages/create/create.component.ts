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
      //
      // .then(() => this.router.navigate(['play', id]))
      // .catch(error => console.error(error));
  }

}
