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
import { tap, first, mergeMap } from 'rxjs/operators';

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

    return this.store.pipe(select(entityExists, { id })).pipe(
      mergeMap((isentityExists) => {
        if (!isentityExists) {
          this.store.dispatch(loadCustomer({ id }));
        }

        return this.store.pipe(select(selectEntity, { id }), first());
      })
    );
  }
}
