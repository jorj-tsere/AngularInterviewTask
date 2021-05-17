import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@core/models';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    return this.http.get<Account[]>(
      environment.baseUrl + '/api/accounts?customerId=' + customerId
    );
  }

  createNewAccount(account: Account): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/accounts', account);
  }
}
