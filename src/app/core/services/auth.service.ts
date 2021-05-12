import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + '/api/auth/getAccessToken',
      credentials
    );
  }

  logout(): Observable<any> {
    return this.http.get(`/api/auth/logout`);
  }
}
