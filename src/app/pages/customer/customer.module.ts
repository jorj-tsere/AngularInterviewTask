import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { customerPageComponents } from './pages';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [...customerPageComponents],
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
})
export class CustomerModule {}
