import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (
      !this.auth.lastToken ||
      (
        this.auth.currentUserValue?.role &&
        Number(this.auth.currentUserValue?.role < expectedRole)
      )
    ) {
      this.router.navigate(['forbidden']);
    }
    return true;
  }
}
