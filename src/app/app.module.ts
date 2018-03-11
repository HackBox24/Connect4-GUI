import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import {HomeComponent} from './pages/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { PlayComponent } from './pages/play/play.component';
import { BoardComponent } from './game-components/board/board.component';
import { BoardRowComponent } from './game-components/board-row/board-row.component';
import { BoardCellComponent } from './game-components/board-cell/board-cell.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { CreateComponent } from './pages/create/create.component';
import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { ConnectComponent } from './pages/connect/connect.component';
import {FormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PlayComponent,
    BoardComponent,
    BoardRowComponent,
    BoardCellComponent,
    CreateComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    FormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  providers: [AuthService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
