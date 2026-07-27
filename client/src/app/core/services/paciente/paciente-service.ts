import { Injectable } from '@angular/core';
import { Pacient } from '../../models/pacient';
import { API_BASE_URL } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPaciente(): Observable<any> {
      const token = this.auth.getToken() || localStorage.getItem('authToken');
      const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });

      // Si el usuario es un paciente, pedir sólo su registro vía /paciente/me
      try {
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const rol = (payload.rol || '').toString().toLowerCase();
          if (rol === 'paciente') {
            return this.http.get<any>(`${this.apiUrl}/paciente/me`, { headers }).pipe(
              map(p => (p ? (Array.isArray(p) ? p : [p]) : []))
            );
          }
        }
      } catch (e) {
        // Si falla parseo, caer al comportamiento por defecto
      }

      return this.http.get<any>(`${this.apiUrl}/paciente`, { headers });
  }

  getPacienteByName(name: string): Observable<any | null> {
    const q = (name || '').toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);
    return this.getPaciente().pipe(
      map((list: any[]) => {
        if (!Array.isArray(list)) return null;
        if (!isNaN(Number(name))) {
          const byId = list.find(e => String(e.id_paciente) === String(name));
          if (byId) return byId;
        }
        const match = list.find(e => {
          const full = ((e.nombres || '') + ' ' + (e.apellidos || '')).toLowerCase();
          const tokensMatch = tokens.length > 0 ? tokens.every(t => full.includes(t)) : false;
          return (
            tokensMatch ||
            full.includes(q) ||
            (e.nombres || '').toLowerCase() === q
          );
        });
        return match || null;
      })
    );
  }

  getPacienteById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paciente/${id}`);
  }
  addPaciente(paciente: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/paciente`, paciente);
  }

  updatePaciente(id: number | string, paciente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/paciente/${id}`, paciente);
  }

  // Actualiza el paciente vinculado al usuario autenticado
  updatePacienteMe(paciente: any): Observable<any> {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    return this.http.put<any>(`${this.apiUrl}/paciente/me`, paciente, { headers });
  }

  // Obtener el paciente vinculado al usuario autenticado
  getPacienteMe(): Observable<any> {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    return this.http.get<any>(`${this.apiUrl}/paciente/me`, { headers });
  }

  updatePacienteByName(name: string, paciente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/paciente/update/${name}`, paciente);
  }

  deletePaciente(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/paciente/${id}`);
  }

}
