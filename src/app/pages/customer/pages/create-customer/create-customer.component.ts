import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerService } from '@core/services/customer.service';
import { LookupService } from '@core/services/lookup.service';
import { Store } from '@ngrx/store';
import { addressFormTypes } from '@shared/enums/address-form-type.enum';
import {
  PhoneNumberValidator,
  SingleLanguageValidator,
  WhitespaceValidator,
} from '@shared/helpers';
import { AppState } from '@store-barrel';
import { createCustomer } from '@store/actions/customer.actions';

interface ListObject {
  id: number;
  name: string;
}

interface Lookups {
  account_statuses: ListObject[];
  account_types: ListObject[];
  ccy: ListObject[];
  gender: ListObject[];
}

interface PreviewImage {
  imgUrl: string | ArrayBuffer | null;
  name: string;
  type: string;
}

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  public form: FormGroup;
  public lookups: Lookups | null = null;
  public equalAddresses = false;
  public selectedImage: PreviewImage | null = null;
  public submitted = false;
  addressFormTypes: typeof addressFormTypes = addressFormTypes;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      firstName: [
        null,
        [
          Validators.required,
          WhitespaceValidator,
          SingleLanguageValidator,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          WhitespaceValidator,
          SingleLanguageValidator,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      genderId: [null, Validators.required],
      personalNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]{11}$/)],
      ],
      phone: [null, [Validators.required, PhoneNumberValidator]],
      legalAddress: this.fb.group({
        country: [null, Validators.required],
        city: [null, Validators.required],
        address: [null, Validators.required],
      }),
      actualAddress: this.fb.group({
        country: [null, Validators.required],
        city: [null, Validators.required],
        address: [null, Validators.required],
      }),
      customerImage: [null],
    });
  }

  ngOnInit(): void {
    this.getCollectionLists();
  }

  updateAddresses(checked: boolean): void {
    Object.keys(this.actualAddress.controls).forEach((controlKey) => {
      this.actualAddress.controls[controlKey].setValue(
        checked ? this.legalAddress.controls[controlKey].value : null
      );
      this.legalAddress.controls[controlKey].updateValueAndValidity();
    });
  }

  get legalAddress(): FormGroup {
    return this.form.controls.legalAddress as FormGroup;
  }
  get actualAddress(): FormGroup {
    return this.form.controls.actualAddress as FormGroup;
  }
  get firstName(): AbstractControl {
    return this.form.controls.firstName;
  }
  get lastName(): AbstractControl {
    return this.form.controls.lastName;
  }
  get genderId(): AbstractControl {
    return this.form.controls.genderId;
  }
  get personalNumber(): AbstractControl {
    return this.form.controls.personalNumber;
  }
  get phone(): AbstractControl {
    return this.form.controls.phone;
  }
  get customerImage(): AbstractControl {
    return this.form.controls.customerImage;
  }

  // tslint:disable-next-line:typedef
  async getCollectionLists() {
    this.lookups = await this.lookupService.lookups().toPromise();
    console.log('this.lookups', this.lookups);
  }

  changed(ev: boolean): void {
    console.log(ev);
  }

  myUploader(ev: any): void {
    const file = ev.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.customerImage.setValue(reader.result);
      this.selectedImage = {
        imgUrl: reader.result,
        name: file.name,
        type: file.type,
      };
    };
  }

  removeEvent($ev: any): void {
    this.customerImage.setValue(null);
  }

  submit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const payload = this.form.getRawValue();
      this.store.dispatch(createCustomer({ customer: payload }));
    }
    console.log('submit');
  }
}
