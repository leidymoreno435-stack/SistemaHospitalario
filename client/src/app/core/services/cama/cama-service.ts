import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CamaService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getCama(): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/cama`, { headers: this.getHeaders() });
  }

  getCamaById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cama/${id}`, { headers: this.getHeaders() });
  }

  addCama(cama: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/cama`, cama, { headers: this.getHeaders() });
  }

  updateCama(id: number | string, cama: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cama/${id}`, cama, { headers: this.getHeaders() });
  }

  deleteCama(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cama/${id}`, { headers: this.getHeaders() });
  }
}