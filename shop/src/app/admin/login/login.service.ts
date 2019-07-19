import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Users } from './users';

@Injectable()
  export class LoginService {
    user: Users;
    redirectUrl: string;
    isLogged = false;

    constructor( private http: HttpClient ) { }

    checkUser(user: Users): Observable<Users> {
      return this.http.post<Users>('api/admin', user)
        .pipe(
          tap(data => {
            this.isLogged = true;
            this.user = data
          }),
          catchError(err => this.handleError(err))
        );
    }

    logOut():void {
      this.isLogged = false;
    }

    handleError(err: HttpErrorResponse) {
      if (err.error instanceof ErrorEvent) {
        console.error('An error was ocurred: ', err.error.message);
      } else {
        console.error(
          `Backend returned code ${err.status}, ` +
          `Body was: ${err.error}`
        );
      }

      return throwError(`Something bad happened: ${err.error.message}`);
    }

  }
