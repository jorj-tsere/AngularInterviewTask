import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerService } from '@core/services/customer.service';
import { LookupService } from '@core/services/lookup.service';
import {
  PhoneNumberValidator,
  SingleLanguageValidator,
  WhitespaceValidator,
} from '@shared/helpers';

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

  constructor(private fb: FormBuilder, private lookupService: LookupService) {
    this.form = this.fb.group({
      firstName: [
        'გიორგი',
        [
          Validators.required,
          WhitespaceValidator,
          SingleLanguageValidator,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        'წერეთელი',
        [
          Validators.required,
          WhitespaceValidator,
          SingleLanguageValidator,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      genderId: [1, Validators.required],
      personalNumber: [null, Validators.required],
      phone: [null, PhoneNumberValidator],
    });
  }

  ngOnInit(): void {
    this.getCollectionLists();
  }

  get firstName(): AbstractControl {
    return this.form.controls.firstName;
  }
  get lastName(): AbstractControl {
    return this.form.controls.lastName;
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
      this.selectedImage = {
        imgUrl: reader.result,
        name: file.name,
        type: file.type,
      };
    };
  }

  removeEvent($ev: any): void {
    console.log('$ev', $ev);
  }
}
