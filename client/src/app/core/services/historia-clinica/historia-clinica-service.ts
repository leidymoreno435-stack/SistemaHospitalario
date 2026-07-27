import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getHistoriasClinicas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historia_clinica`, { headers: this.getHeaders() });
  }

  getHistoriaClinicaById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historia_clinica/${id}`, { headers: this.getHeaders() });
  }

  addHistoriaClinica(historia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/historia_clinica`, historia, { headers: this.getHeaders() });
  }

  updateHistoriaClinica(id: number | string, historia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/historia_clinica/${id}`, historia, { headers: this.getHeaders() });
  }

  deleteHistoriaClinica(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/historia_clinica/${id}`, { headers: this.getHeaders() });
  }
}