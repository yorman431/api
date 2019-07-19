import { Injectable } from '@angular/core';

import { LoginService } from './login/login.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.loginService.isLogged) {
      return true;
    }

    this.loginService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
