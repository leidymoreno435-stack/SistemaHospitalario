import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IngresoService } from '../../services/ingreso/ingreso-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-ingreso-hospitalario',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-ingreso-hospitalario.html',
  styleUrl: './lista-ingreso-hospitalario.css',
})
export class ListaIngresoHospitalario {
  ingreso: any[] = [];

  constructor(private ingresoService: IngresoService, private router: Router) {}

  ngOnInit(): void {
    this.loadIngresos();
  }

  private loadIngresos() {
    this.ingresoService.getIngreso().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.ingreso = Array.isArray(data) ? data : [];
        console.log('Ingresos cargados:', this.ingreso);
      },
      (error) => {
        console.error('Error al cargar ingresos:', error);
        Swal.fire('Error', 'No se pudieron cargar los ingresos hospitalarios', 'error');
      }
    );
  }

  editarIngreso(id: number | string) {
    this.router.navigate(['/nuevo-ingreso'], { queryParams: { id } });
  }

  eliminarIngreso(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el ingreso con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingresoService.deleteIngreso(id).subscribe(
          () => {
            this.loadIngresos();
            Swal.fire('Eliminado', `El ingreso con ID ${id} ha sido eliminado.`, 'success');
          },
          (error) => {
            console.error('Error al eliminar ingreso:', error);
            Swal.fire('Error', 'No se pudo eliminar el ingreso. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
