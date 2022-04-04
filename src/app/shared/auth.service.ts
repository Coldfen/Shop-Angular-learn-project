import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  login(user: object) {
      return this._http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(tap(this.setToken))
  }

  private setToken(response: any) {
    if (response) {
    const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
    localStorage.setItem('fb-token-exp', expData.toString())
    localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }

  logout() {
      this.setToken(null)
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  isAuthenticated() {
    return !!this.token
  }
}
