import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@core/models';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { removeCustomer } from '@store/actions/customer.actions';
import { selectAllCustomers } from '@store/selectors/customer.selectors';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  // public resolverData$: Observable<any>;
  customers: Customer[] = [];

  customers1: Customer[] = [];
  customers2: Customer[] = [];

  subscriptions$: Subscription[] = [];

  selectedCustomer1: Customer | null = null;
  selectedCustomer2: Customer | null = null;

  globalFilters = ['personalNumber'];
  statuses = [
    { name: 'Unqualified', value: 'გიორგი' },
    { name: 'Qualified', value: 1 },
    { name: 'New', value: '3' },
    { name: 'Negotiation', value: '4' },
    { name: 'Renewal', value: '5' },
    { name: 'Proposal', value: '6' },
  ];
  cols: any = [
    { field: 'id', header: 'კლიენტის ID', type: 'numeric', Filterable: true },
    { field: 'firstName', header: 'სახელი', type: 'text', Filterable: true },
    { field: 'lastName', header: 'გვარი', type: 'text', Filterable: true },
    {
      field: 'personalNumber',
      header: 'პირადი ნომერი',
      type: 'text',
      Filterable: true,
    },
    { field: 'phone', header: 'ტელეფონი', type: 'text', Filterable: true },
    { field: null, header: null, type: 'any', Filterable: true },
  ];

  confirm(event: Event, clientId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'დარწმუნები ხართ რომ გსურთ კლიენტის წაშლა?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'დიახ',
      rejectLabel: 'გაუქმება',
      accept: () => {
        this.removeClient(clientId);
      },
      reject: () => {
        // reject action
      },
    });
  }

  removeClient(clientId: number): void {
    this.store.dispatch(removeCustomer({ id: clientId + '' }));
  }

  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {
    const sub$ = this.store
      .pipe(select(selectAllCustomers))
      .subscribe((values) => {
        this.customers = values;
      });
    this.subscriptions$.push(sub$);
  }

  ngOnInit(): void {}

  get dynamicFields(): Array<any> {
    return this.cols.filter((item: any) => !!item.field);
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.forEach((subscription$: Subscription) => {
        subscription$.unsubscribe();
      });
    }
  }
}
