import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private http: HttpClient) {}

  lookups(): Observable<any> {
    return this.http.get(environment.baseUrl + '/api/lookups');
  }
}
