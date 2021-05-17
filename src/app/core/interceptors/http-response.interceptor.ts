import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@env';
import { HttpResponseMessage } from '@core/models';
import { MessageService } from 'primeng/api';
import { AppState } from '@store-barrel';
import { Store } from '@ngrx/store';
import { logoutUser } from '@store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          const httpResponse: HttpResponseMessage = evt.body;
          if (httpResponse.success && httpResponse.body.showMessage) {
            this.messageService.add({
              severity: 'success',
              summary: httpResponse.body.message,
              detail: 'Via MessageService',
            });
          }
        }
      }),
      catchError((response) => {
        return this.errorHandler(response);
      })
    );
  }

  // error Handler
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse) {
      const httpResponse: HttpResponseMessage = response.error;

      // Unauthorized
      if (response.status === 401) {
        this.store.dispatch(logoutUser(true));
      }

      if (httpResponse.body && httpResponse.body.showMessage) {
        this.messageService.add({
          severity: 'error',
          summary: httpResponse.body.message,
          detail: 'Via MessageService',
        });
      } else if (!environment.production) {
        console.log('response', response);
        this.messageService.add({
          severity: 'error',
          summary: 'Somesthing goes wrong, please try later...',
          detail: 'Via MessageService',
        });
        console.log('Request error', response);
      }
    }
    throw response;
  }
}
