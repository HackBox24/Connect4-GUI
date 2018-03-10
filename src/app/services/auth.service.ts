import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public authState: Observable<any | null>;

  constructor(
    private afa: AngularFireAuth
  ) {
    this.authState = this.afa.authState;
  }

  login() {
    return this.afa.auth.signInAnonymously();
  }

  logout () {
    return this.afa.auth.signOut();
  }

}
