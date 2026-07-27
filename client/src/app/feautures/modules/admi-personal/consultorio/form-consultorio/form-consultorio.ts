import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ConsultorioService } from '../../../../../core/services/consultorio/consultorio-service';

@Component({
  selector: 'app-form-consultorio',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-consultorio.html',
  styleUrl: './form-consultorio.css',
})
export class FormConsultorio implements OnInit {
  form: FormGroup;
  isEditing = false;
  consultorioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private consultorioSrv: ConsultorioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(30)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      piso: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.consultorioId = params['id'];
        this.isEditing = true;
        if (this.consultorioId) {
          this.cargarConsultorio(this.consultorioId);
        }
      }
    });
  }

  ngOnInit(): void {}

  cargarConsultorio(id: number | string) {
    this.consultorioSrv.getById(id).subscribe(
      (data: any) => {
        this.form.patchValue({
          codigo: data.codigo,
          nombre: data.nombre,
          piso: data.piso
        });
      },
      (error: any) => {
        console.error('Error al cargar consultorio:', error);
        Swal.fire('Error', 'No se pudo cargar el consultorio', 'error');
        this.router.navigate(['/consultorios']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
      return;
    }

    const consultorio = this.form.value;

    if (this.isEditing && this.consultorioId) {
      this.consultorioSrv.update(this.consultorioId, consultorio).subscribe(
        () => {
          Swal.fire('Éxito', 'Consultorio actualizado correctamente', 'success');
          this.router.navigate(['/consultorios']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el consultorio', 'error');
        }
      );
    } else {
      this.consultorioSrv.create(consultorio).subscribe(
        () => {
          Swal.fire('Éxito', 'Consultorio creado correctamente', 'success');
          this.router.navigate(['/consultorios']);
        },
        (error: any) => {
          console.error('ERROR BACKEND:', error);
          Swal.fire('Error', 'No se pudo crear el consultorio', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/consultorios']);
  }
}
