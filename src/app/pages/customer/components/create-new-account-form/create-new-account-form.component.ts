import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Account, ListObject, Lookups } from '@core/models';
import { Store } from '@ngrx/store';
import { AppState } from '@store-barrel';
import { accountAlredyExists } from '@store/actions/account.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-new-account-form',
  templateUrl: './create-new-account-form.component.html',
  styleUrls: ['./create-new-account-form.component.scss'],
})
export class CreateNewAccountFormComponent implements OnInit {
  customerIdNumber: number;
  newAccountForm: FormGroup;
  @Input() lookups: Lookups;
  @Input() accounts: Account[] = [];
  @Output() addAccountEvent = new EventEmitter<Account>();
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private store: Store<AppState>) {
    // this.lookups.ccy
    this.customerIdNumber = this.route.parent?.snapshot.params.id;

    this.newAccountForm = this.fb.group({
      customerId: [this.customerIdNumber, Validators.required],
      accountTypeId: [null, Validators.required],
      accountType: [null, Validators.required],
      ccyId: [null, Validators.required],
      ccy: [null, Validators.required],
      accountStatusID: [1, Validators.required],
      accountStatus: ['აქტიური', Validators.required],
    });
  }

  get customerId(): AbstractControl {
    return this.newAccountForm.controls.customerId;
  }

  get accountTypeId(): AbstractControl {
    return this.newAccountForm.controls.accountTypeId;
  }

  get accountType(): AbstractControl {
    return this.newAccountForm.controls.accountType;
  }

  get ccyId(): AbstractControl {
    return this.newAccountForm.controls.ccyId;
  }

  get ccy(): AbstractControl {
    return this.newAccountForm.controls.ccy;
  }

  changeValue(fieldName: string, ev: any): void {
    const selectedValue: ListObject = ev.value;
    this.newAccountForm.get(fieldName)?.setValue(selectedValue.name);
    this.newAccountForm.get(fieldName + 'Id')?.setValue(selectedValue.id);
    this.newAccountForm.updateValueAndValidity();
  }

  ngOnInit(): void {}

  cancelAccountForm(): void {
    this.newAccountForm.reset();
  }

  checkAccountTypeIfAlreadyExists(newAccount: Account): boolean {

    const similarAccount = this.accounts.filter((account: Account) => {
      return (
        +account.accountTypeId === +newAccount.accountTypeId &&
        +account.ccyId === +newAccount.ccyId
      );
    });
    return !!similarAccount.length;
  }

  submit(): void {
    if (this.newAccountForm.valid) {
      const account: Account = this.newAccountForm.getRawValue() as Account;
      if (this.checkAccountTypeIfAlreadyExists(account)) {
        this.store.dispatch(accountAlredyExists());
      } else {
        this.addAccountEvent.emit(account);
      }

    }
  }
}
