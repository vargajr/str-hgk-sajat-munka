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
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
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
      this.currentUserSubject.next(user);
      this.lastToken = user.token;
      /* if (user.token) {
      } */
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginData: User): Observable<User | User[] | null> {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    )
    .pipe( switchMap(response => {
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return this.userService.query(`email=${loginData.email}`);
      }
      return of(null);
    }))
    .pipe(
      tap<User | User[] | null>(user => {
        if (!user) {
          localStorage.removeItem(this.storageName);
          this.currentUserSubject.next(null);
          this.lastToken = '';
        } else {
          (user as User[])[0].token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify(user));
          this.currentUserSubject.next(((user as User[])[0]));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
    this.lastToken = '';
    this.router.navigate(['/']);
  }
}
