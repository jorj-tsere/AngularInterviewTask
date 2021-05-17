import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  items: MegaMenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Customers',
        icon: 'pi pi-fw pi-users',
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
      },
    ];
  }
}
