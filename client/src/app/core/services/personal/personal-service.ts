import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getPersonal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal`, { headers: this.getHeaders() });
  }

  getPersonalById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personal/${id}`, { headers: this.getHeaders() });
  }

  addPersonal(personal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personal`, personal, { headers: this.getHeaders() });
  }

  updatePersonal(id: number | string, personal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personal/${id}`, personal, { headers: this.getHeaders() });
  }

  deletePersonal(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/personal/${id}`, { headers: this.getHeaders() });
  }
}