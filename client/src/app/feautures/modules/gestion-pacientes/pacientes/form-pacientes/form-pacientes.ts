import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from '../../../../../core/services/paciente/paciente-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pacient } from '../../../../../core/models/pacient';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-form-pacientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-pacientes.html',
  styleUrl: './form-pacientes.css',
})
export class FormPacientes {

  form: any;
    isEditing = false;
    pacienteId: number | null = null;
  
    constructor(
      private fb: FormBuilder,
      private pacienteSrv: PacienteService,
      private router: Router,
      private route: ActivatedRoute,
      private auth: AuthService
    ) {
      this.form = this.fb.group({
        nombres: ['', [Validators.required, Validators.minLength(3)]],
        apellidos: ['', [Validators.required, Validators.minLength(3)]],
        identificacion: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        sexo: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: [''],
        direccion: ['']
      });
  
      // Verificar si estamos en modo edición
      this.route.queryParams.subscribe(params => {
        if (params['id']) {
          this.pacienteId = params['id'];
          this.isEditing = true;
          if (this.pacienteId) {
            this.cargarPaciente(this.pacienteId);
          }
        } else {
          // Si no hay id y el usuario es paciente, cargar su propio registro
          const token = this.auth.getToken() || localStorage.getItem('authToken');
          try {
            if (token) {
              const payload = JSON.parse(atob(token.split('.')[1]));
              const rol = (payload.rol || '').toString().toLowerCase();
              if (rol === 'paciente') {
                this.isEditing = true;
                this.pacienteSrv.getPacienteMe().subscribe(
                  (p: any) => {
                    try {
                      const data = Array.isArray(p) ? p[0] : p;
                      if (data) {
                        // si existe id_paciente, usarlo para cargar con la ruta /paciente/:id
                        const id = data.id_paciente || data.id;
                        if (id) {
                          this.pacienteId = id;
                          this.cargarPaciente(this.pacienteId!);
                        } else {
                          // fallback: rellenar formulario con lo que tengamos
                          this.form.patchValue({
                            nombres: data.nombres || '',
                            apellidos: data.apellidos || '',
                            identificacion: data.identificacion || '',
                            fecha_nacimiento: this.formatDate(data.fecha_nacimiento),
                            sexo: data.sexo || '',
                            email: data.email || '',
                            telefono: data.telefono || '',
                            direccion: data.direccion || ''
                          });
                        }
                      }
                    } catch (err) {
                      console.error('Error procesando paciente propio:', err);
                    }
                  },
                  (err) => {
                    console.error('Error al cargar paciente propio:', err);
                  }
                );
              }
            }
          } catch (e) {}
        }
      });
    }
  
    cargarPaciente(id: number | string) {
      this.pacienteSrv.getPacienteById(id).subscribe(
        (data:any) => {
          console.log('Paciente cargado:', data);
          this.form.patchValue({
            nombres: data.nombres,
            apellidos: data.apellidos,
            identificacion: data.identificacion,
            fecha_nacimiento: this.formatDate(data.fecha_nacimiento),
            sexo: data.sexo,
            email: data.email,
            telefono: data.telefono,
            direccion: data.direccion
          });
        },
        (error:any) => {
          console.error('Error al cargar paciente:', error);
          Swal.fire('Error', 'No se pudo cargar el paciente', 'error');
          this.router.navigate(['/pacientes']);
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
  
    let paciente: any = {
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      identificacion: this.form.value.identificacion,
      fecha_nacimiento: this.normalizeDateString(this.form.value.fecha_nacimiento), // normalize common formats to yyyy-MM-dd
      sexo: this.normalizeSexo(this.form.value.sexo),
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
    };
  
    if (this.isEditing && this.pacienteId) {
      // Si el usuario es paciente y no tiene permiso para usar el id, usar /me
      const token = this.auth.getToken() || localStorage.getItem('authToken');
      let isPaciente = false;
      try {
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          isPaciente = (payload.rol || '').toString().toLowerCase() === 'paciente';
        }
      } catch (e) {}

      if (isPaciente) {
        this.pacienteSrv.updatePacienteMe(paciente).subscribe(
          () => {
            Swal.fire('Éxito', 'Paciente actualizado correctamente', 'success');
            this.router.navigate(['/pacientes']);
          },
          (error: any) => {
            console.error('Error al actualizar:', error);
            Swal.fire('Error', 'No se pudo actualizar el paciente', 'error');
          }
        );
      } else {
        this.pacienteSrv.updatePaciente(this.pacienteId, paciente).subscribe(
        () => {
          Swal.fire('Éxito', 'Paciente actualizado correctamente', 'success');
          this.router.navigate(['/pacientes']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el paciente', 'error');
        }
        );
      }
    } else {
      paciente.creado_en = new Date().toISOString();
      this.pacienteSrv.addPaciente(paciente).subscribe(
        () => {
          Swal.fire('Éxito', 'Paciente creado correctamente', 'success');
          this.router.navigate(['/pacientes']);
        },
          (error:any) => {
            console.error('ERROR BACKEND:', error);
            const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
            Swal.fire('Error', `No se pudo crear el paciente\n${serverMsg}`, 'error');
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
      this.router.navigate(['/pacientes']);
    }
  }
  


