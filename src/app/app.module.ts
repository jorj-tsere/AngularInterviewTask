import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessageService, SharedModule } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { CoreStoreModule } from '@store/core-store.module';
import { CoreModule } from '@core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CustomerListResolverService } from '@core/resolvers/customer-list-resolver.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    CoreStoreModule,
    ToastModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const accessToken = localStorage.getItem('fakeAccessToken');
          return accessToken;
        },
      },
    }),
  ],
  providers: [MessageService, CustomerListResolverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
