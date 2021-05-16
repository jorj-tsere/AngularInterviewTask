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
          map((customers: Customer[]) =>
            fromCustomerActions.loadCustomersSuccess({ customers })
          ),
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

  createCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.createCustomer),
      mergeMap((action) =>
        this.customerSerive.createCustomer(action.customer).pipe(
          map((customer: Customer) =>
            fromCustomerActions.createCustomerSuccess({ customer })
          ),
          catchError((error: Error) =>
            of(fromCustomerActions.createCustomerFailure({ error }))
          )
        )
      )
    );
  });

  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.updateCustomer),
      mergeMap((action) =>
        this.customerSerive.updateCustomer(action.customer, action.id).pipe(
          map((customer: Customer) =>
            fromCustomerActions.updateCustomerSuccess({ customer })
          ),
          catchError((error: Error) =>
            of(fromCustomerActions.updateCustomerFailure({ error }))
          )
        )
      )
    );
  });

  removeCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.removeCustomer),
      mergeMap((action) =>
        this.customerSerive.removeCustomer(action.id).pipe(
          map((customer: Customer) =>
            fromCustomerActions.removeCustomerSuccess({ id: action.id })
          ),
          catchError((error: Error) =>
            of(fromCustomerActions.createCustomerFailure({ error }))
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
