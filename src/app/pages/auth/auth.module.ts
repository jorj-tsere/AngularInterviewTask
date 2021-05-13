import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AuthWrapperComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
  ],
  exports: [
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
  ],
})
export class AuthModule {}
