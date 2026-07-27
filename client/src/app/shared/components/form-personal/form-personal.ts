import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../../core/services/personal/personal-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-personal.html',
  styleUrl: './form-personal.css',
})
export class FormPersonal {
  form: any;
  isEditing = false;
  personalId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private personalSrv: PersonalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      identificacion: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      activo: [true]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.personalId = params['id'];
        this.isEditing = true;
        if (this.personalId) {
          this.cargarPersonal(this.personalId);
        }
      }
    });
  }

  cargarPersonal(id: number | string) {
    this.personalSrv.getPersonalById(id).subscribe(
      (data:any) => {
        console.log('Personal cargado:', data);
        this.form.patchValue({
          nombres: data.nombres,
          apellidos: data.apellidos,
          identificacion: data.identificacion,
          telefono: data.telefono,
          email: data.email,
          activo: data.activo
        });
      },
      (error: any) => {
        console.error('Error al cargar personal:', error);
        Swal.fire('Error', 'No se pudo cargar el personal', 'error');
        this.router.navigate(['/personal']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) return;

    const personal: any = {
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      identificacion: this.form.value.identificacion,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      activo: this.form.value.activo,
      id_usuario: null, // Por ahora null
      id_especialidad: null // Por ahora null
    };

    if (this.isEditing && this.personalId) {
      // Actualizar personal existente
      this.personalSrv.updatePersonal(this.personalId, personal).subscribe(
        () => {
          Swal.fire('Éxito', 'Personal actualizado correctamente', 'success');
          this.router.navigate(['/personal']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el personal', 'error');
        }
      );
    } else {
      // Crear nuevo personal
      personal.creado_en = new Date();

      this.personalSrv.addPersonal(personal).subscribe(
        () => {
          Swal.fire('Éxito', 'Personal creado correctamente', 'success');
          this.router.navigate(['/personal']);
        },
        (error: any) => {
          console.error('Error al crear:', error);
          Swal.fire('Error', 'No se pudo crear el personal', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/personal']);
  }
}
