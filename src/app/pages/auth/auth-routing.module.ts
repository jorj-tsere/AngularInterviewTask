import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
