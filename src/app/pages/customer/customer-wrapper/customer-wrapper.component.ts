import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-customer-wrapper',
  templateUrl: './customer-wrapper.component.html',
  styleUrls: ['./customer-wrapper.component.scss']
})
export class CustomerWrapperComponent implements OnInit, OnDestroy {
  constructor() {
    console.warn('CustomerWrapperComponent constructor');
  }
  ngOnDestroy(): void {
    console.log('CustomerWrapperComponent destroyed');
  }

  ngOnInit(): void {}

}
