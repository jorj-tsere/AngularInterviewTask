import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from '@core-constants';
import { AuthService } from '@core/services';

@Injectable()
export class AuthGuard implements CanActivate {
  // public routes: typeof routes = routes;

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([routes.AUTH], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
