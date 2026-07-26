import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonalService } from '../../core/services/personal/personal-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-personal',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-personal.html',
  styleUrl: './lista-personal.css',
})
export class ListaPersonal {
  personal: any[] = [];

  constructor(private personalService: PersonalService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersonal();
  }

  private loadPersonal() {
    this.personalService.getPersonal().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.personal = Array.isArray(data) ? data : [];
        console.log('Personal cargado:', this.personal);
      },
      (error: any) => {
        console.error('Error al cargar personal:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del personal', 'error');
      }
    );
  }

  editarPersonal(id: number | string) {
    this.router.navigate(['/nuevo-personal'], { queryParams: { id } });
  }

  eliminarPersonal(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al personal con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personalService.deletePersonal(id).subscribe(
          () => {
            this.loadPersonal();
            Swal.fire('Eliminado', `El personal con ID ${id} ha sido eliminado.`, 'success');
          },
          (error: any) => {
            console.error('Error al eliminar personal:', error);
            Swal.fire('Error', 'No se pudo eliminar el personal. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
