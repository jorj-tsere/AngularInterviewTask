import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, HttpResponseMessage } from '@core/models';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: AuthRequest): Observable<HttpResponseMessage> {
    return this.http.post<HttpResponseMessage>(
      environment.baseUrl + '/api/auth/getAccessToken',
      credentials
    );
  }

  logout(): Observable<any> {
    return this.http.get(`/api/auth/logout`);
  }
}
