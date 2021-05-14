import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { customerPageComponents } from './pages';
import { SharedModule } from '@shared/shared.module';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CustomerListResolverService } from '@core/resolvers/customer-list-resolver.service';
@NgModule({
  declarations: [...customerPageComponents],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MessageModule,
  ],
  providers: [MessageService],
})
export class CustomerModule {}
