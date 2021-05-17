import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Account } from '@core/models';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTypeComponent implements OnInit {
  @Input() accounts: Account[];
  @Input() accountType: string;

  accountSortFn = (account1: Account, account2: Account) => {
    return account1.ccyId - account2.ccyId;
  }

  constructor() {}

  ngOnInit(): void {}

  get sortedAccounts(): Account[] {
    return this.accounts ? this.accounts.sort(this.accountSortFn) : [];
  }


}
