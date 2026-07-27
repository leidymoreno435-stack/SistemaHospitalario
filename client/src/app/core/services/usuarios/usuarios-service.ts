import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios`, { headers: this.getHeaders() });
  }

  getUsuarioById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() });
  }

  addUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario, { headers: this.getHeaders() });
  }

  updateUsuario(id: number | string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario, { headers: this.getHeaders() });
  }

  deleteUsuario(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() });
  }
}
