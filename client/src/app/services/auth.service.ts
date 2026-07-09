import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('usuario', JSON.stringify(authResult.usuario));
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
