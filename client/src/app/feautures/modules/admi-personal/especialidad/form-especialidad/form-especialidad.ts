import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../../../../core/services/especialidad/especialidad-service';

@Component({
  selector: 'app-form-especialidad',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-especialidad.html',
  styleUrl: './form-especialidad.css',
})
export class FormEspecialidad implements OnInit {
  form: FormGroup;
  isEditing = false;
  especialidadId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private especialidadSrv: EspecialidadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.especialidadId = params['id'];
        this.isEditing = true;
        if (this.especialidadId) {
          this.cargarEspecialidad(this.especialidadId);
        }
      }
    });
  }

  ngOnInit(): void {}

  cargarEspecialidad(id: number | string) {
    this.especialidadSrv.getEspecialidadById(id).subscribe(
      (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion
        });
      },
      (error) => {
        console.error('Error al cargar especialidad:', error);
        Swal.fire('Error', 'No se pudo cargar la especialidad', 'error');
        this.router.navigate(['/especialidades']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
      return;
    }

    const especialidad = this.form.value;

    if (this.isEditing && this.especialidadId) {
      this.especialidadSrv.updateEspecialidad(this.especialidadId, especialidad).subscribe(
        () => {
          Swal.fire('Éxito', 'Especialidad actualizada correctamente', 'success');
          this.router.navigate(['/especialidades']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la especialidad', 'error');
        }
      );
    } else {
      this.especialidadSrv.addEspecialidad(especialidad).subscribe(
        () => {
          Swal.fire('Éxito', 'Especialidad creada correctamente', 'success');
          this.router.navigate(['/especialidades']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          Swal.fire('Error', 'No se pudo crear la especialidad', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/especialidades']);
  }
}
