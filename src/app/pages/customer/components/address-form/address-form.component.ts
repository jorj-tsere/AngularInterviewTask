import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { addressFormTypes } from '@shared/enums/address-form-type.enum';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() formType: number;
  @Input() addressFormGroup: FormGroup;
  @Output() userHasIdenticaladdresses = new EventEmitter<boolean>();
  addressFormTypes: typeof addressFormTypes = addressFormTypes;

  constructor() {}

  ngOnInit(): void {}

  changed(ev: any): void {
    this.userHasIdenticaladdresses.emit(ev.checked);
  }
}
