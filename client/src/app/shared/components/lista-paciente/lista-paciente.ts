import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../core/services/paciente/paciente-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-paciente',
  imports: [RouterLink,CommonModule],
  templateUrl: './lista-paciente.html',
  styleUrl: './lista-paciente.css',
})
export class ListaPaciente {
 paciente: any[] = [];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  private loadPacientes() {
    this.pacienteService.getPaciente().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.paciente = Array.isArray(data) ? data : [];
        console.log('Pacientes cargados:', this.paciente);
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
        Swal.fire('Error', 'No se pudieron cargar los pacientes', 'error');
      }
    );
  }

  editarEmpleado(id: number | string) {
    this.router.navigate(['/nuevo-pacientes'], { queryParams: { id } });
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
        this.pacienteService.deletePaciente(id).subscribe(
          () => {
            this.loadPacientes();
            Swal.fire('Eliminado', `El paciente con ID ${id} ha sido eliminado.`, 'success');
          },
          (error) => {
            console.error('Error al eliminar paciente:', error);
            Swal.fire('Error', 'No se pudo eliminar el paciente. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
