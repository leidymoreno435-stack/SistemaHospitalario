import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CirugiaService } from '../../../../../core/services/cirugia/cirugia-service';

@Component({
  selector: 'app-form-cirugia',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-cirugia.html',
  styleUrl: './form-cirugia.css',
})
export class FormCirugia implements OnInit {
  form: FormGroup;
  isEditing = false;
  cirugiaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private cirugiaSrv: CirugiaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_ingreso: [''],
      id_quirofano: [''],
      id_cirujano: [''],
      procedimiento: ['', [Validators.required]],
      fecha_programada: [''],
      fecha_realizacion: [''],
      estado: ['programada'],
      notas: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.cirugiaId = params['id'];
        this.isEditing = true;
        if (this.cirugiaId) {
          this.cargarCirugia(this.cirugiaId);
        }
      }
    });
  }

  ngOnInit(): void {}

  cargarCirugia(id: number | string) {
    this.cirugiaSrv.getById(id).subscribe(
      (data: any) => {
        this.form.patchValue({
          id_ingreso: data.id_ingreso,
          id_quirofano: data.id_quirofano,
          id_cirujano: data.id_cirujano,
          procedimiento: data.procedimiento,
          fecha_programada: data.fecha_programada ? data.fecha_programada.substring(0, 16) : '',
          fecha_realizacion: data.fecha_realizacion ? data.fecha_realizacion.substring(0, 16) : '',
          estado: data.estado,
          notas: data.notas
        });
      },
      (error: any) => {
        console.error('Error al cargar cirugia:', error);
        Swal.fire('Error', 'No se pudo cargar la cirugia', 'error');
        this.router.navigate(['/quirofano']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
      return;
    }

    const cirugia = this.form.value;

    if (this.isEditing && this.cirugiaId) {
      this.cirugiaSrv.update(this.cirugiaId, cirugia).subscribe(
        () => {
          Swal.fire('Éxito', 'Cirugía actualizada correctamente', 'success');
          this.router.navigate(['/quirofano']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la cirugía', 'error');
        }
      );
    } else {
      this.cirugiaSrv.create(cirugia).subscribe(
        () => {
          Swal.fire('Éxito', 'Cirugía creada correctamente', 'success');
          this.router.navigate(['/quirofano']);
        },
        (error: any) => {
          console.error('ERROR BACKEND:', error);
          Swal.fire('Error', 'No se pudo crear la cirugía', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/quirofano']);
  }
}
