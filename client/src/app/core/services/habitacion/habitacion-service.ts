import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getHabitacion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/habitacion`, { headers: this.getHeaders() });
  }

  getHabitacionById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/habitacion/${id}`, { headers: this.getHeaders() });
  }

  addHabitacion(habitacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/habitacion`, habitacion, { headers: this.getHeaders() });
  }

  updateHabitacion(id: number | string, habitacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/habitacion/${id}`, habitacion, { headers: this.getHeaders() });
  }

  deleteHabitacion(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/habitacion/${id}`, { headers: this.getHeaders() });
  }
}