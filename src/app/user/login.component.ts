import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { TOSTER_TOKEN, Toastr } from '../common/toastr.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`em{float: right;color: #E05C65; padding-left:10px}`]
})
export class LoginComponent {
  userName: string;
  password: string;
  mouseoverLogin: boolean;
  constructor(private authService: AuthService, private route: Router,
              @Inject(TOSTER_TOKEN) private toster: Toastr) {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    console.log('Hello About');
  }
  login(data) {
    this.authService.loginUser(data.userName, data.lastName, data.password)
    .pipe(first())
    .subscribe(
        (res) => {
          // Put the object into storage
          localStorage.setItem('userdetails', JSON.stringify(res));
          this.route.navigate(['training']);
        },
        error => {
          this.toster.error(error?.error?.message);
        });

  }
  signUp(data) {
    this.route.navigate(['user/register']);
  }
}
