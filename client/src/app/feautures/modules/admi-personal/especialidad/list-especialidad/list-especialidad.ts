import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../../../../core/services/especialidad/especialidad-service';

@Component({
  selector: 'app-list-especialidad',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-especialidad.html',
  styleUrl: './list-especialidad.css',
})
export class ListEspecialidad implements OnInit {
  especialidades: any[] = [];

  constructor(private especialidadService: EspecialidadService, private router: Router) {}

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  private loadEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe(
      (data: any) => {
        this.especialidades = Array.isArray(data) ? data : data?.value || [];
      },
      (error: any) => {
        console.error('Error al cargar especialidades:', error);
        Swal.fire('Error', 'No se pudieron cargar las especialidades', 'error');
      }
    );
  }

  editarEspecialidad(id: number | string) {
    // Note: ensure this route matches app.routes.ts
    // The route we'll add if not present is 'nueva-especialidad' or similar.
    this.router.navigate(['/nueva-especialidad'], { queryParams: { id } });
  }

  eliminarEspecialidad(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la especialidad con ID ${id}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadService.deleteEspecialidad(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'La especialidad ha sido eliminada.', 'success');
            this.loadEspecialidades();
          },
          (error: any) => {
            console.error('Error al eliminar especialidad:', error);
            Swal.fire('Error', 'No se pudo eliminar la especialidad', 'error');
          }
        );
      }
    });
  }
}
