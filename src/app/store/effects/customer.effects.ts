import { Injectable } from '@angular/core';
import { Customer } from '@core/models';
import { CustomerService } from '@core/services/customer.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import * as fromCustomerActions from '@store/actions/customer.actions';
import { of } from 'rxjs';
import { mergeMap, map, catchError, filter, take } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {
  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.loadCustomers),
      mergeMap((action) => {
        return this.customerSerive.getAll().pipe(
          map((customers: Customer[]) => {
            return fromCustomerActions.loadCustomersSuccess({ customers });
          }),
          catchError((error: Error) =>
            of(fromCustomerActions.loadCustomersFailure({ error }))
          )
        );
      })
    );
  });

  loadCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.loadCustomer),
      mergeMap((action) =>
        this.customerSerive.getCustomer(action.id).pipe(
          map((customer: Customer) =>
            fromCustomerActions.loadCustomerSuccess({ customer })
          ),
          catchError((error: Error) =>
            of(fromCustomerActions.loadCustomerFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private customerSerive: CustomerService
  ) {}
}
