import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@core/models';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { selectAllCustomers } from '@store/selectors/customer.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // public resolverData$: Observable<any>;

  customers: Customer[] = [];

  customers1: Customer[] = [];
  customers2: Customer[] = [];
  selectedCustomer1: Customer | null = null;
  selectedCustomer2: Customer | null = null;

  constructor(private store: Store<AppState>) {
    // this.resolverData$ =
    this.store.pipe(select(selectAllCustomers)).subscribe(values => {
      console.log('values', values);
      this.customers = values;
    });
    // this.
  }

  ngOnInit(): void {}

}
