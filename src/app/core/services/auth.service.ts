import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthRequest, HttpResponseMessage } from '@core/models';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(credentials: AuthRequest): Observable<HttpResponseMessage> {
    return this.http.post<HttpResponseMessage>(
      environment.baseUrl + '/api/auth/getAccessToken',
      credentials
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('fakeAccessToken') || '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(): Observable<any> {
    return this.http.get(`/api/auth/logout`);
  }
}
