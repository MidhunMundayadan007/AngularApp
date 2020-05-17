// src/app/auth/auth-guard.service.ts
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Toastr, TOSTER_TOKEN } from './toastr.service';
// import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,
              @Inject(TOSTER_TOKEN) private toster: Toastr) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.logOut();
      this.toster.warning('Session Timed Out! Please Login');
      this.router.navigate(['user/login']);
      return false;
    }
    return true;
  }
}
