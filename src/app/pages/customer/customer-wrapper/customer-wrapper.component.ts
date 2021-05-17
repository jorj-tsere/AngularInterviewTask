import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@core-constants';
import { CustomerService } from '@core/services/customer.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { loadLookups } from '@store/actions/lookup.actions';
import { isLoaded } from '@store/selectors/lookup.selectors';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-wrapper',
  templateUrl: './customer-wrapper.component.html',
  styleUrls: ['./customer-wrapper.component.scss'],
})
export class CustomerWrapperComponent implements OnInit, OnDestroy {
  sub$: Subscription;
  constructor(private route: Router, private store: Store<AppState>) {
    const readyObsarvable$ = this.store.pipe(select(isLoaded));
    this.sub$ = readyObsarvable$.subscribe((alreadyLoeded) => {
      if (!alreadyLoeded) {
        this.store.dispatch(loadLookups());
      }
    });
  }
  ngOnDestroy(): void {
    console.log('CustomerWrapperComponent destroyed');
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  ngOnInit(): void {}
}
