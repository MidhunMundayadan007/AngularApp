import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './IUser';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:member-ordering
  baseUrl: string = environment.apiUrl;
  public currentUser: IUser;
  logOut() {
    localStorage.removeItem('userdetails');
  }
  registerUser(username: any,  password: any, emailid: any) {

    const registerUser  = { Username: username, Password: password , EmailId: emailid};
    return  this.http.post<IUser>(this.baseUrl + 'api/users/register',
    JSON.stringify(registerUser))
    .pipe(map(res => {
        // this.currentUserSubject.next(res);
        return res;
  }));
  }
  updateCurrentUser(profileFormData: any) {
    this.currentUser.username = profileFormData.firstName;
    this.currentUser.lastName = profileFormData.lastName;
  }
  loginUser(uname: string, lname: string, pwsd: string) {

    const UserCredential  = { Username: uname, Password: pwsd};
    return  this.http.post<IUser>(this.baseUrl + 'api/users/authenticate',
    JSON.stringify(UserCredential))

    .pipe(map(res => {

      return this.currentUser =  {
        username : res.username,
        passwrod : '',
        lastName : res.lastName,
        token: res.token,
     };
  }));
}
  isAuthenticated() {
    // const token = localStorage.getItem('token');
    // Retrieve the object from storage
    const res = JSON.parse(localStorage.getItem('userdetails'));

    if (res != null) {
      this.currentUser =  {
        username : res.username,
        passwrod : '',
        lastName : '',
        token: res.token,
     };
      return true;
    }

    return false;
  }


  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setSeconds(decoded.exp);
    console.log(date);
    var exp1 = decoded.exp * 1000;
    console.log("Expire Date"+new Date(exp1));
    var exp = decoded.nbf * 1000;
    console.log("Nbf Date"+new Date(exp));

    console.log("Current Date"+new Date());

    // let dates = new Date().getTime();
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }
  getToken(): string {
     // const token = localStorage.getItem('token');
    // Retrieve the object from storage
    const res = JSON.parse(localStorage.getItem('userdetails'));
    return res?.token;
  }
}
