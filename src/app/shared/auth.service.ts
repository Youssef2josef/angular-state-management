import { user } from './../models/user.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap, delay, catchError } from "rxjs/operators";

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: number = 0;
    reirectUrl: string|null = null;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router
    ) {}

    login(loginForm: user): Observable<number | user> {
        return this.http.get<user>("/api/login").pipe(
            delay(2000),
            tap((user) => {
              if (user.userName === loginForm.userName && user.password === loginForm.password) {
                  this.isLoggedIn = 1;
                  this.cookieService.set('userName', user.userName);
                  this.cookieService.set('isLoggedIn', 'true');
              } else {
                  this.isLoggedIn = 0;
              }
          }),
          catchError(() => {
              this.isLoggedIn = 2;
              return of(2);
          })
        );
    }

    logOut() {
        this.isLoggedIn = 0;
        this.cookieService.delete('userName');
        this.cookieService.delete('isLoggedIn');
        this.router.navigate(['/login'])
    }

    isUserLoggedIn(): boolean {
        return this.cookieService.get('isLoggedIn') === 'true';
    }
}