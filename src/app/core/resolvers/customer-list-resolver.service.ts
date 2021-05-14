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
import {
  selectAllCustomers,
  selectAllCustomersViewModel,
} from '@store/selectors/customer.selectors';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerListResolverService implements Resolve<any> {
  constructor(private store: Store<AppState>, private action$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.store.dispatch(loadCustomers());

    // return this.store.pipe(select(selectAllCustomers), take(1)).toPromise();

    // return this.action$.pipe(ofType(loadCustomersSuccess));

    // return this.store.pipe(
    //   select(selectAllCustomers),
    //   tap((customers: Customer[]) => {
    //     if (!customers || !customers.length) {
    //       this.store.dispatch(loadCustomers());
    //     }
    //   })
    // );
  }
}
