
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../../../../app.config';

@Component({
  selector: 'app-list-quirofano',
  imports: [CommonModule],
  templateUrl: './list-quirofano.html',
  styleUrl: './list-quirofano.css',
})
export class ListQuirofano {
  quirofanos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuirofanos();
  }

  loadQuirofanos() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    this.http.get<any>(`${API_BASE_URL}/quirofano`, { headers }).subscribe(
      (data: any) => {
        this.quirofanos = Array.isArray(data) ? data : data?.value || [];
      },
      (err: any) => {
        console.error('Error cargando quirofanos', err);
        this.quirofanos = [];
      }
    );
  }
}
