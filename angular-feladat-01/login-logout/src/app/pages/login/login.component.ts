import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  serverError: string = '';

  constructor(
    private atuh: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(ngForm: NgForm): void {
    this.atuh.login(ngForm.value).toPromise().then(
      user => {
        if (this.atuh.lastToken) {
          this.router.navigate(['/']);
        }
      },
      err => {
        this.serverError = err.error;
        const to = setTimeout(() => {
          clearTimeout(to);
          this.serverError = '';
        }, 3500);
      }
    )
  }
}
