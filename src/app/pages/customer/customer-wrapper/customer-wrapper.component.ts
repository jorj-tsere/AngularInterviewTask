import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@core-constants';
import { CustomerService } from '@core/services/customer.service';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-wrapper',
  templateUrl: './customer-wrapper.component.html',
  styleUrls: ['./customer-wrapper.component.scss'],
})
export class CustomerWrapperComponent implements OnInit, OnDestroy {
  constructor(private route: Router) {}
  ngOnDestroy(): void {
    console.log('CustomerWrapperComponent destroyed');
  }

  ngOnInit(): void {}
}
