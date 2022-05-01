import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = environment.springUrl;
  authenticated: boolean = false;

  constructor(private httpClient: HttpClient) { }

  // authenticates the user by getting the jwt token
  authenticate(username: string, password: string): any {
    const authUrl = `${this.baseUrl}/authenticate`;
    return this.httpClient.post<any>(authUrl, { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      ), catchError(this.handleError)
    );
  }

  // return status if user is logged in
  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  // logs out the user
  logOut(): void {
    sessionStorage.removeItem('username')
  }

  // Handles errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      return throwError(error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}