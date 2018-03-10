import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PlayComponent} from './pages/play/play.component';
import {CreateComponent} from './pages/create/create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play/:id', component: PlayComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
