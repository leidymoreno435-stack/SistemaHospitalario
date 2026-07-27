import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitacionService } from '../../../../../core/services/habitacion/habitacion-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-habitacion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-habitacion.html',
  styleUrl: './form-habitacion.css',
})
export class FormHabitacion implements OnInit {
  form: any;
  isEditing = false;
  habitacionId: number | null = null;

  tiposHabitacion = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Doble', label: 'Doble' },
    { value: 'Suite', label: 'Suite' },
    { value: 'Compartida', label: 'Compartida' }
  ];

  constructor(
    private fb: FormBuilder,
    private habitacionSrv: HabitacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      piso: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      tipo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.habitacionId = params['id'];
        this.isEditing = true;
        if (this.habitacionId) {
          this.cargarHabitacion(this.habitacionId);
        }
      }
    });
  }

  ngOnInit(): void {}

  cargarHabitacion(id: number | string) {
    this.habitacionSrv.getHabitacionById(id).subscribe(
      (data) => {
        console.log('Habitación cargada:', data);
        this.form.patchValue({
          codigo: data.codigo,
          piso: data.piso,
          tipo: data.tipo,
          descripcion: data.descripcion
        });
      },
      (error) => {
        console.error('Error al cargar habitación:', error);
        Swal.fire('Error', 'No se pudo cargar la habitación', 'error');
        this.router.navigate(['/habitacion']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente', 'error');
      return;
    }

    let habitacion: any = {
      codigo: this.form.value.codigo,
      piso: this.form.value.piso,
      tipo: this.form.value.tipo,
      descripcion: this.form.value.descripcion
    };

    if (this.isEditing && this.habitacionId) {
      this.habitacionSrv.updateHabitacion(this.habitacionId, habitacion).subscribe(
        () => {
          Swal.fire('Éxito', 'Habitación actualizada correctamente', 'success');
          this.router.navigate(['/habitacion']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la habitación', 'error');
        }
      );
    } else {
      this.habitacionSrv.addHabitacion(habitacion).subscribe(
        () => {
          Swal.fire('Éxito', 'Habitación creada correctamente', 'success');
          this.router.navigate(['/habitacion']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
          Swal.fire('Error', `No se pudo crear la habitación\n${serverMsg}`, 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/habitacion']);
  }
}
