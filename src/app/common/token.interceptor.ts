import { Toastr, TOSTER_TOKEN } from './toastr.service';
import { Router } from '@angular/router';
import { AuthService } from './../user/auth.service';
import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService,
              @Inject(TOSTER_TOKEN) private toster: Toastr) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tslint:disable-next-line: prefer-const
    const token = this.auth?.getToken();
    if (token != null && this.auth.isTokenExpired()) {
      this.auth.logOut();
      this.toster.warning('Session Timed Out! Please Login');
      this.router.navigate(['user/login']);
      return throwError('Session Timed Out');
    } else {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    return next.handle(request);
  }
  }
}
