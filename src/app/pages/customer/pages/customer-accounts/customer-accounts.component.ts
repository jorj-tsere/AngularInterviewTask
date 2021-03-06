import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Account, Lookups } from '@core/models';
import { AccountService } from '@core/services/account.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import {
  accountStatusSuccessfullyChanged,
  accountSuccessfullyRemoved,
  createAccountSuccessfully,
} from '@store/actions/account.actions';
import * as fromLookupSelectors from '@store/selectors/lookup.selectors';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss'],
})
export class CustomerAccountsComponent implements OnInit, OnDestroy {
  customerId: number;
  lookups: Lookups;
  accounts: any[];
  uuid = uuidv4();
  subcsriptions$: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private accountService: AccountService,
  ) {
    this.customerId = this.route.parent?.snapshot.params.id;
    const accountsSubscription$: Subscription = this.route.data.subscribe(
      (data) => {
        this.accounts = data.accounts;
      }
    );
    this.subcsriptions$.push(accountsSubscription$);

    const accountDeleteSub$ = this.accountService
      .listenAccountDeleteAction$()
      .subscribe((accountId: number) => {
        this.store.dispatch(accountSuccessfullyRemoved());
        this.accounts = this.accounts.filter(
          (account: Account) => account.id !== +accountId
        );
      });
    this.subcsriptions$.push(accountDeleteSub$);

    const accountStatusChangedSub$ = this.accountService
      .listenAccountUpdates$()
      .subscribe((updatedAccount: Account) => {
        this.store.dispatch(accountStatusSuccessfullyChanged());
        if (updatedAccount) {
          const accountList = this.accounts.filter(
            (account: Account) => account.id !== updatedAccount.id
          );
          this.accounts = [...accountList, updatedAccount];
        }
      });
    this.subcsriptions$.push(accountStatusChangedSub$);
  }

  ngOnDestroy(): void {
    if (this.subcsriptions$) {
      this.subcsriptions$.forEach((subscription$: Subscription) => {
        subscription$.unsubscribe();
      });
    }
  }

  async addAccount(account: Account): Promise<void> {
    const accountResponse: Account = await this.accountService
      .createNewAccount(account)
      .toPromise();
    this.accounts = [...this.accounts, accountResponse];
    this.store.dispatch(createAccountSuccessfully());
  }

  ngOnInit(): void {
    const readyObservable$ = this.store.pipe(
      select(fromLookupSelectors.Lookup)
    );

    const lookupSubscription$ = readyObservable$.subscribe(
      (lookups: Lookups) => {
        if (lookups.loaded) {
          this.lookups = Object.assign({}, lookups);
        }
      }
    );

    this.subcsriptions$.push(lookupSubscription$);
  }
}
