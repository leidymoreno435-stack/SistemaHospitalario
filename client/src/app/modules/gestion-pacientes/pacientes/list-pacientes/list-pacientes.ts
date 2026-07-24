import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../../services/paciente/paciente-service';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-pacientes',
  imports: [RouterLink,CommonModule],
  templateUrl: './list-pacientes.html',
  styleUrl: './list-pacientes.css',
})
export class ListPacientes {
  paciente: any[] = [];
  currentRole: string | null = null;

  constructor(private pacienteService: PacienteService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const token = this.auth.getToken() || localStorage.getItem('authToken');
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentRole = (payload.rol || '').toString().toLowerCase();
      }
    } catch (e) {}
    this.loadPacientes();
  }

  private loadPacientes() {
    this.pacienteService.getPaciente().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.paciente = Array.isArray(data) ? data : [];
        console.log('Pacientes cargados:', this.paciente);
      },
      (error: any) => {
        console.error('Error al cargar pacientes:', error);
        if (error && error.status === 403) {
          Swal.fire('Sin permisos', 'No tienes permisos para acceder a esta sección', 'error');
        } else {
          Swal.fire('Error', 'No se pudieron cargar los pacientes', 'error');
        }
      }
    );
  }

  editarEmpleado(id: number | string) {
    // Si el usuario es paciente, redirigir a su propio formulario
    if (this.currentRole === 'paciente') {
      this.router.navigate(['/nuevo-pacientes']);
      return;
    }
    this.router.navigate(['/nuevo-pacientes'], { queryParams: { id } });
  }

  eliminarEmpleado(id: number | string) {
    // No permitir eliminar si el usuario es paciente
    if (this.currentRole === 'paciente') {
      Swal.fire('Acceso denegado', 'No puedes eliminar tu propio registro.', 'error');
      return;
    }

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
          (error: any) => {
            console.error('Error al eliminar paciente:', error);
            Swal.fire('Error', 'No se pudo eliminar el paciente. Intenta de nuevo.', 'error');
          }
        );
      }
    });
  }
}
