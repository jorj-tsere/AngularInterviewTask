import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsResolverService } from '@core/resolvers/customer-details-resolver.service';
import { CustomerListResolverService } from '@core/resolvers/customer-list-resolver.service';
import { CustomerWrapperComponent } from './customer-wrapper/customer-wrapper.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { CustomerDetailsWrapperComponent } from './pages/customer-details-wrapper/customer-details-wrapper.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerAccountsComponent } from './pages/customer-accounts/customer-accounts.component';
import { CustomerAccountsResolverService } from './resolver/customer-accounts-resolver.service';

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
        component: CustomerDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: CustomerDetailsWrapperComponent,
        resolve: { customerDetailsData: CustomerDetailsResolverService },
        children: [
          {
            path: 'details',
            component: CustomerDetailsComponent,
          },
          {
            path: '',
            redirectTo: 'details',
          },
          {
            path: 'accounts',
            component: CustomerAccountsComponent,
            resolve: { accounts: CustomerAccountsResolverService },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
