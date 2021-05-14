import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, HttpResponseInterceptor } from './interceptors';
import { ToastModule } from 'primeng/toast';
import { AuthGuard } from './guards/auth.guard';
import { CustomerListResolverService } from './resolvers/customer-list-resolver.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ToastModule],
  exports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
    AuthGuard,
    CustomerListResolverService,
  ],
})
export class CoreModule {}
