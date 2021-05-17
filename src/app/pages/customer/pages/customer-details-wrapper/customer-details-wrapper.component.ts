import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-details-wrapper',
  templateUrl: './customer-details-wrapper.component.html',
  styleUrls: ['./customer-details-wrapper.component.scss'],
})
export class CustomerDetailsWrapperComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.items = [
      {
        label: 'კლიენტის დეტალები',
        icon: 'pi pi-user',
        routerLink: './details',
      },
      {
        label: 'ანგარიშები',
        icon: 'pi pi-credit-card',
        routerLink: './accounts',
      },
    ];
    this.activeItem = !!this.router.url.endsWith('/accounts')
      ? this.items[1]
      : this.items[0];
    // this.activeItem
  }

  ngOnInit(): void {}
}
