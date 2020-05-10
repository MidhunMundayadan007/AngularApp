import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './registration.component.html',
  styles: [`em{float: right;color: #E05C65; padding-left:10px}`]
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  mouseoverLogin: boolean;
  constructor(private authService: AuthService, private route: Router) {

  }
  ngOnInit() {
    console.log('Hello About');
  }
  registerUser(data) {
    this.authService.registerUser(data.username, data.password, data.email)
    .pipe(first())
    .subscribe(
        (res) => {
          this.route.navigate(['user/login']);
        },
        error => {
          console.log(error);
        });
  }
  login(data) {
    this.route.navigate(['user/login']);
  }
}
