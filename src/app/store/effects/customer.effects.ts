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
  loadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCustomerActions.loadCustomers),
      mergeMap((action) => {
        return this.customerSerive.getAll().pipe(
          map((customers: Customer[]) => {
            console.log('customers ', customers);
            return fromCustomerActions.loadCustomersSuccess({ customers });
          }),
          catchError((error: Error) =>
            of(fromCustomerActions.loadCustomersFailure({ error }))
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private customerSerive: CustomerService
  ) {}
}
