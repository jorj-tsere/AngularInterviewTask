import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from '@core/models';
import { Store, select } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { loadCustomer, loadCustomers } from '@store/actions/customer.actions';
import {
  entityExists,
  selectAllCustomers,
  selectEntity,
} from '@store/selectors/customer.selectors';
import { Observable } from 'rxjs';
import { tap, first, mergeMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsResolverService {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // tslint:disable-next-line:no-string-literal
    const { id } = route.params;
    console.log('id', id);
    return this.store.pipe(
      select(selectEntity, { id }),
      tap((customer) => {
        if (!customer) {
          console.warn('customer not found and dispatched', customer);
          this.store.dispatch(loadCustomer({ id }));
        } else {
          console.warn('customer found and not dispatched', customer);
        }
      }),
      filter((customer) => !!customer),
      first()
    );
  }
}
