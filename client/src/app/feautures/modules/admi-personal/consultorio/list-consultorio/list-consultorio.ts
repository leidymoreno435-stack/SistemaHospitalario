import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ConsultorioService } from '../../../../../core/services/consultorio/consultorio-service';

@Component({
  selector: 'app-list-consultorio',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-consultorio.html',
  styleUrl: './list-consultorio.css',
})
export class ListConsultorio implements OnInit {
  consultorios: any[] = [];

  constructor(private consultorioService: ConsultorioService, private router: Router) { }

  ngOnInit(): void {
    this.loadConsultorios();
  }

  private loadConsultorios() {
    this.consultorioService.getAll().subscribe(
      (data: any) => {
        this.consultorios = Array.isArray(data) ? data : data?.value || [];
      },
      (error: any) => {
        console.error('Error al cargar consultorios:', error);
        Swal.fire('Error', 'No se pudieron cargar los consultorios', 'error');
      }
    );
  }

  editarConsultorio(id: number | string) {
    this.router.navigate(['/nuevo-consultorio'], { queryParams: { id } });
  }

  eliminarConsultorio(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el consultorio con ID ${id}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.consultorioService.delete(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El consultorio ha sido eliminado.', 'success');
            this.loadConsultorios();
          },
          (error: any) => {
            console.error('Error al eliminar consultorio:', error);
            Swal.fire('Error', 'No se pudo eliminar el consultorio', 'error');
          }
        );
      }
    });
  }
}
