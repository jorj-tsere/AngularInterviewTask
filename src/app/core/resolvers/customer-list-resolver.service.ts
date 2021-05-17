import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Customer } from '@core/models';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import {
  loadCustomers,
  loadCustomersSuccess,
} from '@store/actions/customer.actions';
import { selectEntities } from '@store/reducers/customer.reducer';
import {
  selectAllCustomers,
  selectAllCustomersViewModel,
} from '@store/selectors/customer.selectors';
import { Observable, of } from 'rxjs';
import { filter, first, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerListResolverService implements Resolve<any> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.store.pipe(
      select(selectAllCustomers),
      tap((customers: Customer[]) => {
        if (!customers || !customers.length) {
          this.store.dispatch(loadCustomers());
        }
      }),
      first()
    );
  }
}
