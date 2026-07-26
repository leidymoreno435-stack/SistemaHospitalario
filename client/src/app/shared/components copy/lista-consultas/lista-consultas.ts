import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ConsultasService } from '../../core/services/consultas/consultas.service';

@Component({
  selector: 'app-lista-consultas',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-consultas.html',
  styleUrl: './lista-consultas.css',
})
export class ListaConsultas {
   consultas: any[] = [];

   constructor(private consultasService: ConsultasService, private router: Router) {}
   
     ngOnInit(): void {
    this.ListarConsultas();
  }
  
  private ListarConsultas() {
    this.consultasService.ListarConsultas().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.consultas = Array.isArray(data) ? data : [];
        console.log('Consultas cargadas:', this.consultas);
      },
      (error) => {
        console.error('Error al cargar consultas:', error);
        Swal.fire('Error', 'No se pudieron cargar las consultas', 'error');
      }
    );
  }

   editarEmpleado(id: number | string) {
      this.router.navigate(['/nuevo-consulta'], { queryParams: { id } });
    }
  
    eliminarEmpleado(id: number | string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar al paciente con ID ${id}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultasService.EliminarConsulta(id).subscribe(
            () => {
              this.ListarConsultas();
              Swal.fire('Eliminado', `La consulta con ID ${id} ha sido eliminada.`, 'success');
            },
            (error) => {
              console.error('Error al eliminar consulta:', error);
              Swal.fire('Error', 'No se pudo eliminar la consulta. Intenta de nuevo.', 'error');
            }
          );
        }
      });
    }

}
