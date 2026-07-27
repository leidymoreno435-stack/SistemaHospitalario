import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IngresoService } from '../../../core/services/ingreso/ingreso-service';
import { PacienteService } from '../../../core/services/paciente/paciente-service';
import { PersonalService } from '../../../core/services/personal/personal-service';
import { CamaService } from '../../../core/services/cama/cama-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingreso',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-ingreso.html',
  styleUrl: './form-ingreso.css',
})
export class FormIngreso {
  form: any;
  isEditing = false;
  ingresoId: number | null = null;
  pacientes: any[] = [];
  medicos: any[] = [];
  camas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ingresoSrv: IngresoService,
    private pacienteSrv: PacienteService,
    private personalSrv: PersonalService,
    private camaSrv: CamaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_paciente: ['', Validators.required],
      id_cama: ['', Validators.required],
      id_medico_responsable: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      fecha_alta: [''],
      motivo_ingreso: ['', Validators.required],
      estado: ['activo', Validators.required]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.ingresoId = params['id'];
        this.isEditing = true;
        if (this.ingresoId) {
          this.cargarIngreso(this.ingresoId);
        }
      }
    });

    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar pacientes
    this.pacienteSrv.getPaciente().subscribe(
      (data) => {
        this.pacientes = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    );

    // Cargar médicos (asumiendo que personal incluye médicos)
    this.personalSrv.getPersonal().subscribe(
      (data:any) => {
        this.medicos = Array.isArray(data) ? data.filter(p => p.activo) : [];
      },
      (error) => {
        console.error('Error al cargar médicos:', error);
      }
    );

    // Cargar camas
    this.camaSrv.getCama().subscribe(
      (data) => {
        this.camas = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error al cargar camas:', error);
      }
    );
  }

  cargarIngreso(id: number | string) {
    this.ingresoSrv.getIngresoById(id).subscribe(
      (data) => {
        console.log('Ingreso cargado:', data);
        this.form.patchValue({
          id_paciente: data.id_paciente,
          id_cama: data.id_cama,
          id_medico_responsable: data.id_medico_responsable,
          fecha_ingreso: this.formatDateTime(data.fecha_ingreso),
          fecha_alta: data.fecha_alta ? this.formatDateTime(data.fecha_alta) : '',
          motivo_ingreso: data.motivo_ingreso,
          estado: data.estado
        });
      },
      (error: any) => {
        console.error('Error al cargar ingreso:', error);
        Swal.fire('Error', 'No se pudo cargar el ingreso', 'error');
        this.router.navigate(['/ingreso-hospitalario']);
      }
    );
  }

  formatDateTime(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  guardar() {
    if (this.form.invalid) return;

    const ingreso: any = {
      id_paciente: parseInt(this.form.value.id_paciente),
      id_cama: parseInt(this.form.value.id_cama),
      id_medico_responsable: parseInt(this.form.value.id_medico_responsable),
      fecha_ingreso: this.form.value.fecha_ingreso,
      fecha_alta: this.form.value.fecha_alta || null,
      motivo_ingreso: this.form.value.motivo_ingreso,
      estado: this.form.value.estado
    };

    if (this.isEditing && this.ingresoId) {
      this.ingresoSrv.updateIngreso(this.ingresoId, ingreso).subscribe(
        () => {
          Swal.fire('Éxito', 'Ingreso actualizado correctamente', 'success');
          this.router.navigate(['/ingreso-hospitalario']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el ingreso', 'error');
        }
      );
    } else {
      this.ingresoSrv.addIngreso(ingreso).subscribe(
        () => {
          Swal.fire('Éxito', 'Ingreso creado correctamente', 'success');
          this.router.navigate(['/ingreso-hospitalario']);
        },
        (error: any) => {
          console.error('Error al crear:', error);
          Swal.fire('Error', 'No se pudo crear el ingreso', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/ingreso-hospitalario']);
  }
}
