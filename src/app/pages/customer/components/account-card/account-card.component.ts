import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Account } from '@core/models';
import { AccountService } from '@core/services/account.service';
import { fadeInOut } from '@shared/animations/animations';
import { AccountStatuses } from '@shared/enums/account-statuses.enum';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCardComponent implements OnInit {
  @Input() account: Account;
  accountCopy: Account;
  constructor(
    private confirmationService: ConfirmationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountCopy = Object.assign({}, this.account);
  }

  confirm(event: Event): void {
    console.log('event', event);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'დარწმუნები ხართ რომ გსურთ ანგარიშის წაშლა?',
      icon: 'pi pi-shield',
      acceptLabel: 'დიახ',
      rejectLabel: 'გაუქმება',
      accept: () => {
        this.removeAccount(this.account.id);
      },
    });
  }

  confirmActivateAccountToggle(event: Event): void {
    console.log('event', event);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'დარწმუნები ხართ რომ გსურთ ანგარიშის სტატუსის ცვლილება?',
      icon: 'pi pi-shield',
      acceptLabel: 'დიახ',
      rejectLabel: 'გაუქმება',
      accept: () => {
        this.activateAccountToggle();
      },
    });
  }

  async activateAccountToggle(): Promise<void> {
    this.accountCopy.accountStatusID =
      +this.account.accountStatusID === AccountStatuses.ACTIVE
        ? AccountStatuses.BLOCKED
        : AccountStatuses.ACTIVE;

    this.accountCopy.accountStatus =
      +this.account.accountStatusID === AccountStatuses.ACTIVE
        ? 'დახურული'
        : 'აქტიური';

    console.log('this.accountCopy', this.accountCopy);
    const response = await this.accountService.updateAccountStatus(
      this.accountCopy
    );
    console.log('activateAccountToggle', response);
  }

  async removeAccount(accountId: any): Promise<void> {
    const response = await this.accountService.deleteAccount(accountId);
    console.log('removeAccount', response);
  }

  handleChange(e: any): void {
    console.log(e);
  }
}
