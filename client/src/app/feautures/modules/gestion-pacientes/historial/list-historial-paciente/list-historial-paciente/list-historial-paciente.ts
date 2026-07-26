/*import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistoriaClinicaService } from '../../../../../core/services/historia-clinica/historia-clinica-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-historial-paciente',
  imports: [CommonModule, DatePipe],
  templateUrl: './list-historial-paciente.html',
  styleUrl: './list-historial-paciente.css',
})
export class ListHistorialPaciente implements OnInit {

  historias: any[] = [];
  idPaciente: number | string | null = null;

  constructor(
    private historiaService: HistoriaClinicaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idPaciente = params['idPaciente'] || null;
      if (this.idPaciente) {
        this.ListarHistoriasPaciente(this.idPaciente);
      }
    });
  }

  public ListarHistorias() {
    this.historiaService.getHistoriasClinicas().subscribe(
      (data) => {
        this.historias = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error al cargar historias clínicas:', error);
        Swal.fire('Error', 'No se pudieron cargar las historias clínicas', 'error');
      }
    );
  }

  public ListarHistoriasPaciente(idpaciente?: number | string) {
    const id = (idpaciente ?? this.idPaciente) as string | number | undefined;
    if (!id) return;
    this.historiaService.getHistoriasClinicas().subscribe(
      (data) => {
        const list = Array.isArray(data) ? data : [];
        this.historias = list.filter(h => String(h.id_paciente) === String(id));
        console.log('ListarHistoriasPaciente - filtradas:', this.historias);
      },
      (error) => {
        console.error('Error al cargar historias clínicas del paciente:', error);
        Swal.fire('Error', 'No se pudieron cargar las historias del paciente', 'error');
      }
    );
  }

  buscarPorId(valor: string) {
    const id = String(valor || '').trim();
    if (!id) { Swal.fire('Atención', 'Ingresa un ID de paciente válido', 'warning'); return; }
    this.idPaciente = id;
    this.ListarHistoriasPaciente(id);
  }

  cancelarHistoria(id: number | string) {
    Swal.fire({
      title: '¿Eliminar historia?',
      text: `Se eliminará la historia clínica con ID ${id}. ¿Continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.historiaService.deleteHistoriaClinica(id).subscribe(
          () => {
            Swal.fire('Eliminada', 'La historia clínica ha sido eliminada.', 'success');
            this.historias = [];
          },
          (error) => {
            console.error('Error al eliminar historia:', error);
            Swal.fire('Error', 'No se pudo eliminar la historia', 'error');
          }
        );
      }
    });
  }

}*/
