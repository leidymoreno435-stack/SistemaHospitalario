import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-signos-vitales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-signos-vitales.html',
  styleUrl: './form-signos-vitales.css',
})
export class FormSignosVitales implements OnInit {
  form: any;
  isEditing = false;
  signosId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_paciente: ['', Validators.required],
      fecha_registro: ['', Validators.required],
      presion_arterial: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      temperatura: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      pulso: ['', [Validators.required, Validators.min(40), Validators.max(200)]],
      saturacion_oxigeno: ['', [Validators.required, Validators.min(70), Validators.max(100)]],
      frecuencia_respiratoria: [''],
      peso: [''],
      talla: [''],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.signosId = params['id'];
        this.isEditing = true;
        if (this.signosId) {
          this.cargarSignos(this.signosId);
        }
      }
    });
  }

  cargarSignos(id: number | string) {
    // Placeholder - implementar con servicio real
    this.form.patchValue({
      id_paciente: '1',
      fecha_registro: new Date().toISOString().slice(0, 16),
      presion_arterial: '120/80',
      temperatura: '36.5',
      pulso: '72',
      saturacion_oxigeno: '98',
      frecuencia_respiratoria: '16',
      peso: '70',
      talla: '170',
      observaciones: ''
    });
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos requeridos correctamente', 'error');
      return;
    }

    const signos = this.form.value;

    if (this.isEditing && this.signosId) {
      // Actualizar
      Swal.fire('Éxito', 'Signos vitales actualizados correctamente', 'success');
      this.router.navigate(['/signos-vitales']);
    } else {
      // Crear
      Swal.fire('Éxito', 'Signos vitales registrados correctamente', 'success');
      this.router.navigate(['/signos-vitales']);
    }
  }

  volver() {
    this.router.navigate(['/signos-vitales']);
  }
}
