import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getEspecialidad(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/especialidad`, { headers: this.getHeaders() });
  }

  getEspecialidadById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/especialidad/${id}`, { headers: this.getHeaders() });
  }

  addEspecialidad(especialidad: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/especialidad`, especialidad, { headers: this.getHeaders() });
  }

  updateEspecialidad(id: number | string, especialidad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/especialidad/${id}`, especialidad, { headers: this.getHeaders() });
  }

  deleteEspecialidad(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/especialidad/${id}`, { headers: this.getHeaders() });
  }
}
