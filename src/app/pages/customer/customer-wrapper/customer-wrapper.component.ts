import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routes } from '@core-constants';
import { CustomerService } from '@core/services/customer.service';
import { select, Store } from '@ngrx/store';
import { fadeInOut } from '@shared/animations/animations';
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
  animations: [fadeInOut],
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

  // tslint:disable-next-line:typedef
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      // tslint:disable-next-line:no-string-literal
      outlet.activatedRouteData['animation']
    );
  }

  ngOnInit(): void {}
}
