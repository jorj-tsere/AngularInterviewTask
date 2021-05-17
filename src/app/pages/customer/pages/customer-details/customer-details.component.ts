import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Customer, Lookups } from '@core/models';
import { CustomerService } from '@core/services/customer.service';
import { LookupService } from '@core/services/lookup.service';
import { select, Store } from '@ngrx/store';
import { addressFormTypes } from '@shared/enums/address-form-type.enum';
import {
  PhoneNumberValidator,
  SingleLanguageValidator,
  WhitespaceValidator,
} from '@shared/helpers';
import { AppState } from '@store-barrel';
import {
  createCustomer,
  loadCustomer,
  updateCustomer,
} from '@store/actions/customer.actions';
import { selectEntity } from '@store/selectors/customer.selectors';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  public form: FormGroup;
  public lookups: Lookups;
  public equalAddresses = false;
  public submitted = false;
  customer$: Observable<any>;
  customer: Customer;
  fromEditInterface = false;
  customerId: number;
  addressFormTypes: typeof addressFormTypes = addressFormTypes;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fromEditInterface = this.router.url.indexOf('/edit') !== -1;
    this.customerId = this.route.parent?.snapshot.params.id;
    console.log('this.route.parent?.snapshot', this.route.parent?.snapshot);

    // customerDetailsData
    // this.customer$ = this.store.pipe(
    //   select(selectEntity, { id: this.customerId })
    // );
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


    this.route.parent?.data.subscribe((data) => {
      this.customer = data.customerDetailsData;
      this.setValues();
    });
  }

  setValues(): void {
      this.firstName.setValue(this.customer.firstName);
      this.lastName.setValue(this.customer.lastName);
      this.customerImage.setValue(this.customer.customerImage);
      this.genderId.setValue(+this.customer.genderId);
      this.personalNumber.setValue(this.customer.personalNumber);
      this.phone.setValue(this.customer.phone);
      // set Legal Address
      this.legalAddress.controls.address.setValue(
        this.customer.legalAddress.address
      );
      this.legalAddress.controls.country.setValue(
        this.customer.legalAddress.country
      );
      this.legalAddress.controls.city.setValue(this.customer.legalAddress.city);
      // set Actual Address
      this.actualAddress.controls.address.setValue(
        this.customer.actualAddress.address
      );
      this.actualAddress.controls.country.setValue(
        this.customer.actualAddress.country
      );
      this.actualAddress.controls.city.setValue(this.customer.actualAddress.city);

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
      this.store.dispatch(
        this.fromEditInterface
          ? updateCustomer({ id: this.customerId, customer: payload })
          : createCustomer({ customer: payload })
      );
    }
    // console.log('submit');
  }
}
