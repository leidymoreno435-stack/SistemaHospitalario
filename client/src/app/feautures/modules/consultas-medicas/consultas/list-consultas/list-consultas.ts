import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConsultasService } from '../../../../../core/services/consultas/consultas.service';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-list-consultas',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-consultas.html',
  styleUrl: './list-consultas.css',
})
export class ListConsultas implements OnInit {
consultas: any[] = [];
esPaciente: boolean = false;
idPaciente: number | string | null = null;

   constructor(
     private consultasService: ConsultasService, 
     private router: Router,
     private route: ActivatedRoute,
     private authService: AuthService
   ) {}
   
     ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idPaciente = params['idPaciente'] || null;
      this.esPaciente = this.authService.hasRole('paciente');
      
      if (this.esPaciente && !this.idPaciente) {
        const usuarioActual = this.authService.getUsuarioActual();
        this.idPaciente = usuarioActual?.id_paciente || null;
      }
      
      if (this.esPaciente && this.idPaciente) {
        this.ListarConsultasPaciente();
      } else {
        this.ListarConsultas();
      }
    });
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

  private ListarConsultasPaciente() {
    if (!this.idPaciente) return;
    
    this.consultasService.ListarConsultasPorPaciente(this.idPaciente).subscribe(
      (data) => {
        console.log('Consultas del paciente:', data);
        this.consultas = Array.isArray(data) ? data : [];
        console.log('Consultas cargadas:', this.consultas);
      },
      (error) => {
        console.error('Error al cargar consultas del paciente:', error);
        Swal.fire('Error', 'No se pudieron cargar tus consultas', 'error');
      }
    );
  }

   editarEmpleado(id: number | string) {
      const queryParams: any = { id };
      if (this.esPaciente && this.idPaciente) {
        queryParams.idPaciente = this.idPaciente;
      }
      this.router.navigate(['/nuevo-consulta'], { queryParams });
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
