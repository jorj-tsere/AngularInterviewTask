import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Account, ListObject } from '@core/models';
import { AccountTypes } from '@shared/enums/account-types.enum';

@Component({
  selector: 'app-account-type-wrapper',
  templateUrl: './account-type-wrapper.component.html',
  styleUrls: ['./account-type-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTypeWrapperComponent implements OnInit, OnChanges {
  @Input() accounts: Account[] = [];
  accountsCurrent: Account[] = [];
  accountsAccumulative: Account[] = [];
  accountsSaving: Account[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accounts && changes.accounts.currentValue) {
      this.accountsCurrent = this.filterAccountsByAccountType(
        AccountTypes.CURRENT,
        changes.accounts.currentValue
      );
      this.accountsAccumulative = this.filterAccountsByAccountType(
        AccountTypes.ACCUMULATIVE,
        changes.accounts.currentValue
      );
      this.accountsSaving = this.filterAccountsByAccountType(
        AccountTypes.SAVING,
        changes.accounts.currentValue
      );
    }
  }

  private filterAccountsByAccountType(
    accountType: number,
    accounts: Account[]
  ): Account[] {
    return accounts.filter(
      (account: Account) => +account.accountTypeId === accountType
    );
  }
}
