import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getIngreso(): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/ingreso`, { headers: this.getHeaders() });
  }

  getIngresoById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ingreso/${id}`, { headers: this.getHeaders() });
  }

  addIngreso(ingreso: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/ingreso`, ingreso, { headers: this.getHeaders() });
  }

  updateIngreso(id: number | string, ingreso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ingreso/${id}`, ingreso, { headers: this.getHeaders() });
  }

  deleteIngreso(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ingreso/${id}`, { headers: this.getHeaders() });
  }

}