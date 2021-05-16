import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [MessageService],
})
export class SidebarComponent implements OnInit {
  items: MegaMenuItem[] = [];
  constructor(private messageService: MessageService) {}

  update(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete(): void {
    console.log('delete clicked');
  }

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
