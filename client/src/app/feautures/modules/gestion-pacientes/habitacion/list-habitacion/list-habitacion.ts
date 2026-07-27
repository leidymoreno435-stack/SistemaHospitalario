import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { HabitacionService } from '../../../../../core/services/habitacion/habitacion-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-habitacion',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-habitacion.html',
  styleUrl: './list-habitacion.css',
})
export class ListHabitacion implements OnInit {
  habitaciones: any[] = [];

  constructor(private habitacionService: HabitacionService, private router: Router) {}

  ngOnInit(): void {
    this.loadHabitaciones();
  }

  private loadHabitaciones() {
    this.habitacionService.getHabitacion().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.habitaciones = Array.isArray(data) ? data : [];
        console.log('Habitaciones cargadas:', this.habitaciones);
      },
      (error: any) => {
        console.error('Error al cargar habitaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
      }
    );
  }

  editarHabitacion(id: number | string) {
    this.router.navigate(['/nuevo-habitacion'], { queryParams: { id } });
  }

  eliminarHabitacion(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la habitación con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitacionService.deleteHabitacion(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'La habitación ha sido eliminada.', 'success');
            this.loadHabitaciones(); // Recargar la lista
          },
          (error: any) => {
            console.error('Error al eliminar habitación:', error);
            Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
          }
        );
      }
    });
  }
}
