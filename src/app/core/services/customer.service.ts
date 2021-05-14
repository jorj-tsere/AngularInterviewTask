import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(environment.baseUrl + '/api/customers');
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/api/customers/' + id);
  }
}
