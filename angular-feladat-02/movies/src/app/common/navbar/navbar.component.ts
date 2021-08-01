import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  navigation = this.config.navigation;
  userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy():void {
    this.userSub.unsubscribe();
  }

  onLogout():void {
    this.auth.logout();
  }
}

