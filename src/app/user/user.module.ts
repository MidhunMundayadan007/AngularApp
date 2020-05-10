import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    UserRoutingModule,
  ]})
export class UserModule { }
