import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  getRecetas(page: number = 1, limit: number = 10, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters.id_paciente) params = params.set('id_paciente', filters.id_paciente);
    if (filters.id_medico) params = params.set('id_medico', filters.id_medico);

    return this.http.get<any>(`${this.apiUrl}/receta`, { params });
  }

  getRecetaById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/receta/${id}`);
  }

  addReceta(receta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/receta`, receta);
  }

  updateReceta(id: number | string, receta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receta/${id}`, receta);
  }

  deleteReceta(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/receta/${id}`);
  }
}