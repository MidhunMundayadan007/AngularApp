import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TOSTER_TOKEN, Toastr } from '../common/toastr.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`em{float: right;color: #E05C65; padding-left:10px}
  .error input {background-color: #E3C3C5}`]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  constructor(private authServic: AuthService, private route: Router,
              @Inject(TOSTER_TOKEN) private toster: Toastr) {

  }
  ngOnInit() {
    this.firstName = new FormControl(this.authServic.currentUser.username, Validators.required);
    this.lastName = new FormControl(this.authServic.currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
  saveProfile(profileFormData) {
    if (this.profileForm.valid) {
      this.authServic.updateCurrentUser(profileFormData);
      // this.route.navigate(['training']);
      this.toster.success('profile updated');
    }
  }
  cancel() {
    this.route.navigate(['training']);
  }
  validateFirstName() {
    return this.firstName.valid;
  }
  validateLastName() {
    return this.lastName.valid;
  }
}
