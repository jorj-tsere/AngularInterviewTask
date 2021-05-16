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

@Injectable()
export class AuthGuard implements CanActivate {
  // public routes: typeof routes = routes;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = localStorage.getItem('fakeAccessToken');
    if (!user) {
      this.router.navigate([routes.AUTH], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
