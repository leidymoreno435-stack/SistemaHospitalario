import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { RecetaService } from '../../../core/services/receta/receta-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-recetas',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-recetas.html',
  styleUrl: './lista-recetas.css',
})
export class ListaRecetas {
  recetas: any[] = [];
  total: number = 0;
  page: number = 1;
  pages: number = 1;

  constructor(private recetaService: RecetaService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas() {
    this.recetaService.getRecetas(this.page, 10).subscribe(
      (data:any) => {
        console.log('Datos recibidos:', data);
        this.recetas = data.data || [];
        this.total = data.total || 0;
        this.page = data.page || 1;
        this.pages = data.pages || 1;
      },
      (error: any) => {
        console.error('Error al cargar recetas:', error);
        Swal.fire('Error', 'No se pudieron cargar las recetas', 'error');
      }
    );
  }

  editarReceta(id: number | string) {
    this.router.navigate(['/nueva-receta'], { queryParams: { id } });
  }

  eliminarReceta(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la receta con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recetaService.deleteReceta(id).subscribe(
          () => {
            this.loadRecetas();
            Swal.fire('Eliminado', `La receta con ID ${id} ha sido eliminada.`, 'success');
          },
          (error: any) => {
            console.error('Error al eliminar receta:', error);
            Swal.fire('Error', 'No se pudo eliminar la receta. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page++;
      this.loadRecetas();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadRecetas();
    }
  }
}
