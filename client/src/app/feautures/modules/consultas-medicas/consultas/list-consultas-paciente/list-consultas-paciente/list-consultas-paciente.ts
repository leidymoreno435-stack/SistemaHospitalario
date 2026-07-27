import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConsultasService } from '../../../../../../core/services/consultas/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-consultas-paciente',
  imports: [CommonModule, DatePipe],
  templateUrl: './list-consultas-paciente.html',
  styleUrl: './list-consultas-paciente.css',
})
export class ListConsultasPaciente implements OnInit {

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
   
  }


  public ListarConsultasPaciente(idpaciente: number | string) {
    
    this.consultasService.ListarConsultasPorPaciente(idpaciente).subscribe(
      (data) => {
        console.log('ListarConsultasPaciente - resultados filtrados:', data);
        this.consultas = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error al cargar consultas del paciente:', error);
        Swal.fire('Error', 'No se pudieron cargar tus consultas', 'error');
      }
    );
    console.log('ListarConsultasPaciente llamado con id=', idpaciente);
  }

  cancelarConsulta(id: number | string) {
    Swal.fire({
      title: '¿Cancelar consulta?',
      text: `Se eliminará la consulta con ID ${id}. ¿Continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.consultasService.EliminarConsulta(id).subscribe(
          () => {
            Swal.fire('Cancelada', 'La consulta ha sido cancelada.', 'success');
            this.ListarConsultasPaciente(id);
                   // vaciar la tabla para el paciente (según solicitud)
                   this.consultas = [];
          },
          (error) => {
            console.error('Error al cancelar consulta:', error);
            Swal.fire('Error', 'No se pudo cancelar la consulta', 'error');
          }
        );
      }
    });
  }

  
}

