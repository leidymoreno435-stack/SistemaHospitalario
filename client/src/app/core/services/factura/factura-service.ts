import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/factura`, { headers: this.headers() });
  }

  getById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/factura/${id}`, { headers: this.headers() });
  }

  create(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/factura`, payload, { headers: this.headers() });
  }

  update(id: number | string, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/factura/${id}`, payload, { headers: this.headers() });
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/factura/${id}`, { headers: this.headers() });
  }
}
