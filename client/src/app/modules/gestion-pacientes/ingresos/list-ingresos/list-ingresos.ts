import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IngresoService } from '../../../../services/ingreso/ingreso-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-ingresos',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-ingresos.html',
  styleUrl: './list-ingresos.css',
})
export class ListIngresos implements OnInit {
  ingresos: any[] = [];

  constructor(private ingresoService: IngresoService, private router: Router) {}

  ngOnInit(): void {
    this.loadIngresos();
  }

  private loadIngresos() {
    this.ingresoService.getIngreso().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.ingresos = Array.isArray(data) ? data : [];
        console.log('Ingresos cargados:', this.ingresos);
      },
      (error: any) => {
        console.error('Error al cargar ingresos:', error);
        Swal.fire('Error', 'No se pudieron cargar los ingresos hospitalarios', 'error');
      }
    );
  }

  editarIngreso(id: number | string) {
    this.router.navigate(['/nuevo-ingresos'], { queryParams: { id } });
  }

  eliminarIngreso(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el ingreso hospitalario con ID ${id}. Esta acción no se puede deshacer.`,
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
            Swal.fire('Eliminado', `El ingreso hospitalario con ID ${id} ha sido eliminado.`, 'success');
          },
          (error: any) => {
            console.error('Error al eliminar ingreso:', error);
            Swal.fire('Error', 'No se pudo eliminar el ingreso hospitalario. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
