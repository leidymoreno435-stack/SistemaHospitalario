import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalService } from '../../../../../core/services/personal/personal-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-personal',
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
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
      identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(13)]],
      telefono: ['',[Validators.pattern(/^[0-9]{7,10}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
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
      (data) => {
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
      (error) => {
        console.error('Error al cargar personal:', error);
        Swal.fire('Error', 'No se pudo cargar el miembro del personal', 'error');
        this.router.navigate(['/personal']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) return;

    let personal: any = {
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      identificacion: this.form.value.identificacion,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      activo: this.form.value.activo
    };

    if (this.isEditing && this.personalId) {
      this.personalSrv.updatePersonal(this.personalId, personal).subscribe(
        () => {
          Swal.fire('Éxito', 'Personal actualizado correctamente', 'success');
          this.router.navigate(['/personal']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el miembro del personal', 'error');
        }
      );
    } else {
      personal.creado_en = new Date().toISOString();
      this.personalSrv.addPersonal(personal).subscribe(
        () => {
          Swal.fire('Éxito', 'Personal creado correctamente', 'success');
          this.router.navigate(['/personal']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
          Swal.fire('Error', `No se pudo crear el miembro del personal\n${serverMsg}`, 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/personal']);
  }
}
