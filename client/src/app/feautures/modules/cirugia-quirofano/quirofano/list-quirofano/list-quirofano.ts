import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../../../../app.config';

@Component({
  selector: 'app-list-quirofano',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-quirofano.html',
  styleUrl: './list-quirofano.css',
})
export class ListQuirofano implements OnInit {
  quirofanos: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

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

  editarQuirofano(id: number | string) {
    this.router.navigate(['/nuevo-quirofano'], { queryParams: { id } });
  }

  eliminarQuirofano(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el quirófano con ID ${id}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
        this.http.delete(`${API_BASE_URL}/quirofano/${id}`, { headers }).subscribe(
          () => {
            Swal.fire('Eliminado', 'El quirófano ha sido eliminado.', 'success');
            this.loadQuirofanos();
          },
          (error: any) => {
            console.error('Error al eliminar quirófano:', error);
            Swal.fire('Error', 'No se pudo eliminar el quirófano', 'error');
          }
        );
      }
    });
  }
}
