import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from '../../core/services/consultas/consultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-consulta',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-consulta.html',
  styleUrl: './form-consulta.css',
})
export class FormConsulta {
form: any;
  isEditing = false;
  consultaid: number | null = null;

constructor(
    private fb: FormBuilder,
    private servicioconsulta: ConsultasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   
    this.form = this.fb.group({
      IdPaciente: ['', [Validators.required, Validators.minLength(1)]],
      IdMedico: ['', [Validators.required, Validators.minLength(1)]], 
      IdConsultorio: ['', [Validators.required, Validators.minLength(1)]],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
      observaciones: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.minLength(0)]],
      fecha_programada: ['', [Validators.required]],
      fecha_realizacion: [''],
      Duracion_min: ['', [Validators.required, Validators.minLength(1)]],
      Tarifa: ['', [Validators.required, Validators.minLength(1)]],
      Creado: ['', [Validators.required]]
    });

  // Verificar si estamos en modo edición
      this.route.queryParams.subscribe(params => {
        if (params['id']) {
          this.consultaid = params['id'];
          this.isEditing = true;
          if (this.consultaid) {
            this.cargarConsulta(this.consultaid);
          }
        }
      });
    }
  
    cargarConsulta(id: number | string) {
      this.servicioconsulta.ListarConsultasPorId(id).subscribe(
        (data) => {
          console.log('Consulta cargada:', data);
          this.form.patchValue({
            IdPaciente: data.id_paciente,
            IdMedico: data.id_medico,
            IdConsultorio: data.id_consultorio,
            motivo: data.motivo,
            observaciones: data.observaciones, 
            estado: data.estado,
            fecha_programada: this.formatDate(data.fecha_programada),
            fecha_realizacion: this.formatDate(data.fecha_realizacion),
            Duracion_min: data.duracion_min,
            Tarifa: data.tarifa,
            Creado: data.creado_en
          });
        },
        (error) => {
          console.error('Error al cargar consulta:', error);
          Swal.fire('Error', 'No se pudo cargar la consulta', 'error');
          this.router.navigate(['/consulta']);
        }
      );
    }
  
    formatDate(date: any): string {
      if (!date) return '';
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    }
  
    guardar() {
    if (this.form.invalid) return;
  
    const consulta = {
      id_paciente: this.form.value.IdPaciente ? Number(this.form.value.IdPaciente) : null,
      id_medico: this.form.value.IdMedico ? Number(this.form.value.IdMedico) : null,
      id_consultorio: this.form.value.IdConsultorio ? Number(this.form.value.IdConsultorio) : null,
      motivo: this.form.value.motivo,
      observaciones: this.form.value.observaciones,
      estado: this.form.value.estado ? this.form.value.estado : null,
      fecha_programada: this.normalizeDateString(this.form.value.fecha_programada),
      fecha_realizacion: this.normalizeDateString(this.form.value.fecha_realizacion),
      duracion_min: this.form.value.Duracion_min ? Number(this.form.value.Duracion_min) : null,
      tarifa: this.form.value.Tarifa ? Number(this.form.value.Tarifa) : null,
      creado_en: this.normalizeDateString(this.form.value.Creado) || null
    };

    if (this.isEditing && this.consultaid) {
      this.servicioconsulta.ActualizarConsulta(this.consultaid, consulta).subscribe(
        () => {
          Swal.fire('Éxito', 'Consulta actualizada correctamente', 'success');
          this.router.navigate(['/consulta']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la consulta', 'error');
        }
      );
    } else {
      this.servicioconsulta.Agregarconsulta(consulta).subscribe(
        () => {
          Swal.fire('Éxito', 'Consulta creada correctamente', 'success');
          this.router.navigate(['/consulta']);
        },
          (error) => {
            console.error('ERROR BACKEND:', error);
            const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
            Swal.fire('Error', `No se pudo crear la consulta\n${serverMsg}`, 'error');
          }
      );
    }
  }
  
    normalizeDateString(dateStr: any): string | null {
      if (!dateStr) return null;
      // If already ISO-like yyyy-mm-dd, return as-is (or trimmed)
      if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        return dateStr.split('T')[0];
      }
      // Common dd/mm/yyyy or dd-MM-yyyy -> convert to yyyy-mm-dd
      if (typeof dateStr === 'string' && /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/.test(dateStr)) {
        const parts = dateStr.split(/[\/\-]/);
        let day = parts[0].padStart(2, '0');
        let month = parts[1].padStart(2, '0');
        let year = parts[2];
        if (year.length === 2) { year = '19' + year; }
        return `${year}-${month}-${day}`;
      }
      // Try Date parse fallback
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      }
      return null;
    }
  
    normalizeSexo(value: any): string | null {
      if (!value && value !== 0) return null;
      const v = String(value).trim().toLowerCase();
      if (v === 'm' || v === 'masculino' || v.startsWith('m')) return 'M';
      if (v === 'f' || v === 'femenino' || v.startsWith('f')) return 'F';
      // fallback: take first letter uppercase if letter
      const first = v.charAt(0).toUpperCase();
      return /[A-Z]/.test(first) ? first : null;
    }
  
  
    volver() {
      this.router.navigate(['/consulta']);
    }
  }
  