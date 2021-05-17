import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@core/models';
import { environment } from '@env';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private updateAccountSubject = new Subject<Account>();
  private deleteAccountSubject = new Subject<number>();

  constructor(private http: HttpClient) {}

  listenAccountUpdates$(): Observable<Account> {
    return this.updateAccountSubject.asObservable();
  }

  listenAccountDeleteAction$(): Observable<number> {
    return this.deleteAccountSubject.asObservable();
  }

  getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    return this.http.get<Account[]>(
      environment.baseUrl + '/api/accounts?customerId=' + customerId
    );
  }

  async updateAccountStatus(account: Account): Promise<Account> {
    const response: Account = await this.http
      .put<Account>(
        environment.baseUrl + '/api/accounts/' + account.id,
        account
      )
      .toPromise();
    console.log('responseeeeeee', response);
    this.updateAccountSubject.next(response);
    return response;
  }

  async deleteAccount(accountId: number): Promise<any> {
    const response = await this.http
      .delete(environment.baseUrl + '/api/accounts/' + accountId)
      .toPromise();
    this.deleteAccountSubject.next(accountId);
    return response;
  }

  createNewAccount(account: Account): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/accounts', account);
  }
}
