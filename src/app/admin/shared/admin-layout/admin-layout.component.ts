import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  get auth() {
    return this._auth
  }

  ngOnInit(): void {
  }

  logout(event) {
    event.preventDefault()
    this._auth.logout()
    this._router.navigate(['/admin', 'login'])
  }
}
