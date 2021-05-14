import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from '@store/actions/auth.actions';

@Injectable()
export class RouteEffects {
  goToCustomersPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap(() => this.route.navigate(['/customers']))
      ),
    { dispatch: false }
  );

  goToLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logoutUser),
        tap(() => {
          localStorage.removeItem('fakeAccessToken');
          return this.route.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private route: Router) {}
}
