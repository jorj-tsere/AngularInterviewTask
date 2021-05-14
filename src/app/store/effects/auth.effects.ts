import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { AuthService } from '@core/services';
import * as AuthActions from '@store/actions/auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpResponseMessage, User } from '@core/models';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) => {
            if (response.body.data.accessToken) {
              const accessToken = response.body.data.accessToken;
              const user = this.jwtHelper.decodeToken(accessToken);
              console.log('this.jwtHelper', user);
              return AuthActions.loginSuccess({ user  });
            } else {
              throw new Error('Valid token not returned');
            }
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) {}
}
