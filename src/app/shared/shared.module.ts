import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FooterComponent,
  HeaderComponent,
  LayoutWrapperComponent,
  SidebarComponent,
} from './layout';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import {MegaMenuModule} from 'primeng/megamenu';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutWrapperComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    MenubarModule,
    SidebarModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenuModule,
    ToastModule,
    MegaMenuModule,
    AvatarModule
  ],
  exports: [
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    LayoutWrapperComponent,
    SidebarComponent,
    SidebarModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenuModule,
    ToastModule,
    MegaMenuModule,
    AvatarModule
  ],
})
export class SharedModule {}
