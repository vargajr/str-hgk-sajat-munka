import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${this.config.apiUrl}login`;
  logoutUrl: string = `${this.config.apiUrl}logout`;
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(new User());
  lastToken: string = '';
  storageName: string = 'currentUser';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
    const storedUser = localStorage.getItem(this.storageName);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        this.currentUserSubject.next(user);
        this.lastToken = user.token;
      }
    }
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginData: User): Observable<User | User[]> {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    )
    .pipe( switchMap(response => {
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return this.userService.query(`email=${loginData.email}`);
      }
      return of(new User());
    }))
    .pipe(
      tap(user => {
        if (!(user as User[])[0].hasOwnProperty('email')) {
          localStorage.removeItem(this.storageName);
          this.currentUserSubject.next(new User());
        } else {
          (user as User[])[0].token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify((user as User[])[0]));
          this.currentUserSubject.next((user as User[])[0]);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(new User());
    this.router.navigate(['/']);
  }
}
