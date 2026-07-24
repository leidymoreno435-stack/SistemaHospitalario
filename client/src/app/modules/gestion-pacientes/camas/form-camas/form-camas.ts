import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamaService } from '../../../../services/cama/cama-service';
import { HabitacionService } from '../../../../services/habitacion/habitacion-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-camas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-camas.html',
  styleUrl: './form-camas.css',
})
export class FormCamas implements OnInit {
  form: any;
  isEditing = false;
  camaId: number | null = null;
  habitaciones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private camaSrv: CamaService,
    private habitacionSrv: HabitacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_habitacion: ['', Validators.required],
      numero: ['', Validators.required],
      estado: ['Disponible', Validators.required]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.camaId = params['id'];
        this.isEditing = true;
        if (this.camaId) {
          this.cargarCama(this.camaId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadHabitaciones();
  }

  private loadHabitaciones() {
    this.habitacionSrv.getHabitacion().subscribe(
      (data: any) => {
        this.habitaciones = Array.isArray(data) ? data : [];
      },
      (error: any) => {
        console.error('Error al cargar habitaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las habitaciones', 'error');
      }
    );
  }

  cargarCama(id: number | string) {
    this.camaSrv.getCamaById(id).subscribe(
      (data) => {
        console.log('Cama cargada:', data);
        this.form.patchValue({
          id_habitacion: data.id_habitacion,
          numero: data.numero,
          estado: data.estado
        });
      },
      (error) => {
        console.error('Error al cargar cama:', error);
        Swal.fire('Error', 'No se pudo cargar la cama', 'error');
        this.router.navigate(['/camas']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) return;

    let cama: any = {
      id_habitacion: this.form.value.id_habitacion,
      numero: this.form.value.numero,
      estado: this.form.value.estado
    };

    if (this.isEditing && this.camaId) {
      this.camaSrv.updateCama(this.camaId, cama).subscribe(
        () => {
          Swal.fire('Éxito', 'Cama actualizada correctamente', 'success');
          this.router.navigate(['/camas']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la cama', 'error');
        }
      );
    } else {
      this.camaSrv.addCama(cama).subscribe(
        () => {
          Swal.fire('Éxito', 'Cama creada correctamente', 'success');
          this.router.navigate(['/camas']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
          Swal.fire('Error', `No se pudo crear la cama\n${serverMsg}`, 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/camas']);
  }
}
