import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-signos-vitales',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-signos-vitales.html',
  styleUrl: './list-signos-vitales.css',
})
export class ListSignosVitales implements OnInit {
  signosVitales: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSignosVitales();
  }

  loadSignosVitales() {
    // Placeholder - se implementará con servicio real
    this.signosVitales = [
      {
        id: 1,
        paciente: 'Juan Pérez',
        fecha: new Date(),
        presion: '120/80',
        temperatura: '36.5',
        pulso: '72',
        saturacion: '98'
      }
    ];
  }

  editarSignos(id: number | string) {
    this.router.navigate(['/nuevo-signos-vitales'], { queryParams: { id } });
  }

  eliminarSignos(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el registro con ID ${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadSignosVitales();
        Swal.fire('Eliminado', `El registro con ID ${id} ha sido eliminado.`, 'success');
      }
    });
  }
}
