import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoriaClinicaService } from '../../../../core/services/historia-clinica/historia-clinica-service';
import { PacienteService } from '../../../../core/services/paciente/paciente-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-historial',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-historial.html',
  styleUrl: './form-historial.css',
})
export class FormHistorial implements OnInit {
  form: any;
  isEditing = false;
  historiaId: number | null = null;
  pacientes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private historiaSrv: HistoriaClinicaService,
    private pacienteSrv: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_paciente: ['', Validators.required],
      id_ingreso: [''],
      resumen: ['', Validators.required],
      anotaciones: [''],
      fecha_registro: [new Date().toISOString().split('T')[0], Validators.required]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.historiaId = params['id'];
        this.isEditing = true;
        if (this.historiaId) {
          this.cargarHistoria(this.historiaId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadPacientes();
  }

  private loadPacientes() {
    this.pacienteSrv.getPaciente().subscribe(
      (data: any) => {
        this.pacientes = Array.isArray(data) ? data : [];
      },
      (error: any) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

  cargarHistoria(id: number | string) {
    this.historiaSrv.getHistoriaClinicaById(id).subscribe(
      (data) => {
        console.log('Historia clínica cargada:', data);
        this.form.patchValue({
          id_paciente: data.id_paciente,
          id_ingreso: data.id_ingreso,
          resumen: data.resumen,
          anotaciones: data.anotaciones,
          fecha_registro: data.fecha_registro ? new Date(data.fecha_registro).toISOString().split('T')[0] : ''
        });
      },
      (error) => {
        console.error('Error al cargar historia clínica:', error);
        Swal.fire('Error', 'No se pudo cargar la historia clínica', 'error');
        this.router.navigate(['/historial']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) return;

    let historia: any = {
      id_paciente: this.form.value.id_paciente,
      id_ingreso: this.form.value.id_ingreso || null,
      resumen: this.form.value.resumen,
      anotaciones: this.form.value.anotaciones,
      fecha_registro: this.form.value.fecha_registro
    };

    if (this.isEditing && this.historiaId) {
      this.historiaSrv.updateHistoriaClinica(this.historiaId, historia).subscribe(
        () => {
          Swal.fire('Éxito', 'Historia clínica actualizada correctamente', 'success');
          this.router.navigate(['/historial']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la historia clínica', 'error');
        }
      );
    } else {
      this.historiaSrv.addHistoriaClinica(historia).subscribe(
        () => {
          Swal.fire('Éxito', 'Historia clínica creada correctamente', 'success');
          this.router.navigate(['/historial']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
          Swal.fire('Error', `No se pudo crear la historia clínica\n${serverMsg}`, 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/historial']);
  }
}
