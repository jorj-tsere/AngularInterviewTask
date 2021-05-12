import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutWrapperComponent } from './layout/container/layout-wrapper/layout-wrapper.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
