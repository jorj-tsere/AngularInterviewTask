import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsResolverService } from '@core/resolvers/customer-details-resolver.service';
import { CustomerListResolverService } from '@core/resolvers/customer-list-resolver.service';
import { CustomerWrapperComponent } from './customer-wrapper/customer-wrapper.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CustomerListComponent,
      },
      {
        path: 'create',
        component: CreateCustomerComponent,
      },
      {
        path: 'edit/:id',
        component: UpdateCustomerComponent,
        resolve: { data: CustomerDetailsResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
