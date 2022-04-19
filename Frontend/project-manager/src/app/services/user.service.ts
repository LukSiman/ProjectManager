import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.springUrl + "/users";

  constructor(private httpClient: HttpClient) { }

  addNewUser(newUser: User): Observable<User> {
    const newUserUrl = `${this.usersUrl}/signup`;
    return this.httpClient.post<getUser>(newUserUrl, newUser).pipe(catchError(this.handleError));
  }

  // Handles errors
  private handleError(error: HttpErrorResponse) {
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

interface getUser {
  userID: number,
  username: string,
  password: string
}