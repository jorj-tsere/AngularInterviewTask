import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-details-wrapper',
  templateUrl: './customer-details-wrapper.component.html',
  styleUrls: ['./customer-details-wrapper.component.scss'],
})
export class CustomerDetailsWrapperComponent implements OnInit {
  constructor() {
    console.log('CustomerDetailsWrapperComponent',  new Date().getTime());
  }

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/details' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: '/accounts' }
    ];
  }
}
