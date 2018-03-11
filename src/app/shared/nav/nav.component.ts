import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private afa: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.afa.logout();
    this.router.navigate(['']);
  }

}
