import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {} from 'primeng/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'user',
        items: [
          { label: 'Profile', icon: 'pi pi-fw pi-plus' },
        ],
      },
      {
        label: 'Quit',
        items: [
          { label: 'sign out', icon: 'pi pi-sign-out' },
        ],
      },
    ];
  }
}
