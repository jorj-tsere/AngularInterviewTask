import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import * as fromAuthActions from '@store/actions/auth.actions';

@Injectable()
export class AlertEffects {
  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Welcome Back ' + action.user.username + ' !',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Unable to login',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logoutUser),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'User Loged Out!',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) {}
}
