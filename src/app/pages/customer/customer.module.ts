import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { customerPageComponents } from './pages';
import { SharedModule } from '@shared/shared.module';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CustomerDetailsWrapperComponent } from './pages/customer-details-wrapper/customer-details-wrapper.component';
import { DividerModule } from 'primeng/divider';
import { CustomerAccountsComponent } from './pages/customer-accounts/customer-accounts.component';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    ...customerPageComponents,
    AddressFormComponent,
    CustomerDetailsWrapperComponent,
    CustomerAccountsComponent
  ],
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
    InputTextModule,
    FieldsetModule,
    CheckboxModule,
    FormsModule,
    FileUploadModule,
    InputNumberModule,
    TabMenuModule,
    TooltipModule,
    ConfirmPopupModule,
    DividerModule,
    SplitterModule,
    CardModule,
  ],
  exports: [
    TableModule,
    ContextMenuModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FieldsetModule,
    CheckboxModule,
    FileUploadModule,
    InputNumberModule,
    TooltipModule,
    ConfirmPopupModule,
    DividerModule,
    SplitterModule,
    CardModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CustomerModule {}
