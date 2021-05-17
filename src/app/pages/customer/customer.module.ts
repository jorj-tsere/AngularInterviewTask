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
import { CustomerAccountsResolverService } from './resolver/customer-accounts-resolver.service';
import { CreateNewAccountFormComponent } from './components/create-new-account-form/create-new-account-form.component';
import { MessagesModule } from 'primeng/messages';
import { AccountTypeWrapperComponent } from './components/account-type-wrapper/account-type-wrapper.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AccountCardComponent } from './components/account-card/account-card.component';

@NgModule({
  declarations: [
    ...customerPageComponents,
    AddressFormComponent,
    CustomerDetailsWrapperComponent,
    CustomerAccountsComponent,
    CreateNewAccountFormComponent,
    AccountTypeWrapperComponent,
    AccountTypeComponent,
    AccountCardComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MessageModule,
    MessagesModule,
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
    InputSwitchModule
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
    MessagesModule,
    InputSwitchModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    CustomerAccountsResolverService,
  ],
})
export class CustomerModule {}
