import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterseptor implements HttpInterceptor {
  constructor( 
    private _authService: AuthService,
    private _router: Router
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this._authService.token
        }
      })
    }
    return next.handle(req).pipe(
      catchError( error => {
        if (error === 401 ) {
          this._authService.logout()
          this._router.navigate(['/admin', 'login'])
        }
        return throwError(error)
      })
    )
  }

}