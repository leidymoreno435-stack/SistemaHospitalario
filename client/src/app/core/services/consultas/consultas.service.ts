import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  ListarConsultas(): Observable<any> {
       return this.http.get<any>(`${this.apiUrl}/consulta`);
  }

  ListarConsultasPorId(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/consulta/${id}`);
  }
  Agregarconsulta(consulta: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/consulta`, consulta);
  }

  ActualizarConsulta(id: number | string, consulta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/consulta/${id}`, consulta);
  }

  ActualizarEstado(estado: string, consulta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/consulta/update/${estado}`, consulta);
  }

  EliminarConsulta(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/consulta/${id}`);
  }

  ListarConsultasPorPaciente(idPaciente: number | string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/consulta`).pipe(
      tap(list => console.log('ListarConsultasPorPaciente - obtenidas', list)),
      map(list => Array.isArray(list) ? list.filter(c => String(c.id_paciente) === String(idPaciente)) : [])
    );
  }

}
