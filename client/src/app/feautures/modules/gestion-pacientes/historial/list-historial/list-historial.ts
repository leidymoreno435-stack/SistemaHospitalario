import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { HistoriaClinicaService } from '../../../../../core/services/historia-clinica/historia-clinica-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-historial',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-historial.html',
  styleUrl: './list-historial.css',
})
export class ListHistorial implements OnInit {
  historias: any[] = [];

  constructor(private historiaService: HistoriaClinicaService, private router: Router) {}

  ngOnInit(): void {
    this.loadHistorias();
  }

  private loadHistorias() {
    this.historiaService.getHistoriasClinicas().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.historias = Array.isArray(data) ? data : [];
        console.log('Historias clínicas cargadas:', this.historias);
      },
      (error: any) => {
        console.error('Error al cargar historias clínicas:', error);
        Swal.fire('Error', 'No se pudieron cargar las historias clínicas', 'error');
      }
    );
  }

  editarHistoria(id: number | string) {
    this.router.navigate(['/nuevo-historial'], { queryParams: { id } });
  }

  eliminarHistoria(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la historia clínica con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.historiaService.deleteHistoriaClinica(id).subscribe(
          () => {
            this.loadHistorias();
            Swal.fire('Eliminado', `La historia clínica con ID ${id} ha sido eliminada.`, 'success');
          },
          (error: any) => {
            console.error('Error al eliminar historia clínica:', error);
            Swal.fire('Error', 'No se pudo eliminar la historia clínica. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
