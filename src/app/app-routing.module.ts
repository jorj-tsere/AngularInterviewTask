import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedGuard } from '@core/guards/already-logged.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { CustomerListResolverService } from '@core/resolvers/customer-list-resolver.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AlreadyLoggedGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    resolve: { data: CustomerListResolverService },
    loadChildren: () =>
      import('./pages/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
