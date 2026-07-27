import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CamaService } from '../../../../../core/services/cama/cama-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-camas',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-camas.html',
  styleUrl: './list-camas.css',
})
export class ListCamas implements OnInit {
  camas: any[] = [];

  constructor(private camaService: CamaService, private router: Router) {}

  ngOnInit(): void {
    this.loadCamas();
  }

  private loadCamas() {
    this.camaService.getCama().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.camas = Array.isArray(data) ? data : [];
        console.log('Camas cargadas:', this.camas);
      },
      (error: any) => {
        console.error('Error al cargar camas:', error);
        Swal.fire('Error', 'No se pudieron cargar las camas', 'error');
      }
    );
  }

  editarCama(id: number | string) {
    this.router.navigate(['/nuevo-camas'], { queryParams: { id } });
  }

  eliminarCama(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la cama con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.camaService.deleteCama(id).subscribe(
          () => {
            this.loadCamas();
            Swal.fire('Eliminado', `La cama con ID ${id} ha sido eliminada.`, 'success');
          },
          (error: any) => {
            console.error('Error al eliminar cama:', error);
            Swal.fire('Error', 'No se pudo eliminar la cama. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
