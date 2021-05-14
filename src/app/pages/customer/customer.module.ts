import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { customerPageComponents } from './pages';
import { SharedModule } from '@shared/shared.module';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [...customerPageComponents],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MessageModule,
    TableModule,
    ContextMenuModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule
  ],
  exports: [
    TableModule,
    ContextMenuModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule
  ],
  providers: [MessageService],
})
export class CustomerModule {}
