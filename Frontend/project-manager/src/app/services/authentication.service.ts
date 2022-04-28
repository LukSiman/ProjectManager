import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated: boolean = false;
  private usersUrl = environment.springUrl + "/users";

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post<any>('http://localhost:8080/api/authenticate', { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr= 'Bearer '+ userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}