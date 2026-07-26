import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../core/services/receta/receta-service';
import { PacienteService } from '../../core/services/paciente/paciente-service';
import { PersonalService } from '../../core/services/personal/personal-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-receta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-receta.html',
  styleUrl: './form-receta.css',
})
export class FormReceta {
  form: any;
  isEditing = false;
  recetaId: number | null = null;
  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private recetaSrv: RecetaService,
    private pacienteSrv: PacienteService,
    private personalSrv: PersonalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_paciente: ['', Validators.required],
      id_medico: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      instrucciones: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.recetaId = params['id'];
        this.isEditing = true;
        if (this.recetaId) {
          this.cargarReceta(this.recetaId);
        }
      }
    });

    this.loadPacientes();
    this.loadMedicos();
  }

  loadPacientes() {
    this.pacienteSrv.getPaciente().subscribe(
      (data) => {
        this.pacientes = Array.isArray(data) ? data : [];
        console.log('Pacientes cargados:', this.pacientes);
      },
      (error: any) => {
        console.error('Error cargando pacientes:', error);
      }
    );
  }

  loadMedicos() {
    this.personalSrv.getPersonal().subscribe(
      (data) => {
        this.medicos = Array.isArray(data) ? data : [];
        console.log('Médicos cargados:', this.medicos);
      },
      (error: any) => {
        console.error('Error cargando médicos:', error);
      }
    );
  }

  cargarReceta(id: number | string) {
    this.recetaSrv.getRecetaById(id).subscribe(
      (data) => {
        console.log('Receta cargada:', data);
        this.form.patchValue({
          id_paciente: data.id_paciente,
          id_medico: data.id_medico,
          fecha_emision: this.formatDate(data.fecha_emision),
          instrucciones: data.instrucciones
        });
      },
      (error: any) => {
        console.error('Error al cargar receta:', error);
        Swal.fire('Error', 'No se pudo cargar la receta', 'error');
        this.router.navigate(['/recetas']);
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

    const receta: any = {
      id_paciente: this.form.value.id_paciente,
      id_medico: this.form.value.id_medico,
      fecha_emision: this.form.value.fecha_emision,
      instrucciones: this.form.value.instrucciones
    };

    if (this.isEditing && this.recetaId) {
      // Actualizar receta existente
      this.recetaSrv.updateReceta(this.recetaId, receta).subscribe(
        () => {
          Swal.fire('Éxito', 'Receta actualizada correctamente', 'success');
          this.router.navigate(['/recetas']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar la receta', 'error');
        }
      );
    } else {
      // Crear nueva receta
      this.recetaSrv.addReceta(receta).subscribe(
        () => {
          Swal.fire('Éxito', 'Receta creada correctamente', 'success');
          this.router.navigate(['/recetas']);
        },
        (error: any) => {
          console.error('Error al crear:', error);
          Swal.fire('Error', 'No se pudo crear la receta', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/recetas']);
  }
}
