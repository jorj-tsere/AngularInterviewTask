import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import * as fromAuthActions from '@store/actions/auth.actions';
import * as fromCustomer from '@store/actions/customer.actions';
import {
  accountAlredyExists,
  accountStatusSuccessfullyChanged,
  accountSuccessfullyRemoved,
  createAccountSuccessfully,
} from '@store/actions/account.actions';

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

  accountAlredyExists$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountAlredyExists),
        tap((action) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'ანგარიში უკვე არსებობს!',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  accountRemovedSuccessfuly$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountSuccessfullyRemoved),
        tap((action) => {
          this.messageService.add({
            severity: 'success',
            summary: 'ანგარიში წარმატებით წაიშალა!',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  accountStatusChagedSuccessfuly$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountStatusSuccessfullyChanged),
        tap((action) => {
          this.messageService.add({
            severity: 'success',
            summary: 'ანგარიში სტატუსი წარმატებით შეიცვალა!',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  createAccountSuccessfully$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createAccountSuccessfully),
        tap((action) => {
          this.messageService.add({
            severity: 'success',
            summary: 'ანგარიში წარმატებით დაემატა!',
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
        tap((action) => {
          if (!action.system) {
            this.messageService.add({
              severity: 'success',
              summary: 'თქვენ წარმატებით გამოხვედით სისტემიდან!',
              detail: 'Via MessageService',
            });
          }
        })
      ),
    { dispatch: false }
  );

  createCustomerSuccessMsg$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCustomer.createCustomerSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'კლიენტი წარმატებით შეიქმნა',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  updateCustomerSuccessMsg$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCustomer.updateCustomerSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'კლიენტი მონაცემები წარმატებით განახლდა!',
            detail: 'Via MessageService',
          });
        })
      ),
    { dispatch: false }
  );

  removeCustomerSuccessMsg$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCustomer.removeCustomerSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'კლიენტი წარმატებით წაიშალა',
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
