import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngresoService } from '../../../../core/services/ingreso/ingreso-service';
import { PacienteService } from '../../../../core/services/paciente/paciente-service';
import { PersonalService } from '../../../../core/services/personal/personal-service';
import { CamaService } from '../../../../core/services/cama/cama-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingresos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-ingresos.html',
  styleUrl: './form-ingresos.css',
})
export class FormIngresos implements OnInit {
  form: any;
  isEditing = false;
  ingresoId: number | null = null;
  pacientes: any[] = [];
  personal: any[] = [];
  camas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ingresoSrv: IngresoService,
    private pacienteSrv: PacienteService,
    private personalSrv: PersonalService,
    private camaSrv: CamaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_paciente: ['', Validators.required],
      id_cama: ['', Validators.required],
      id_medico_responsable: ['', Validators.required],
      fecha_ingreso: [new Date().toISOString().split('T')[0], Validators.required],
      fecha_alta: [''],
      motivo_ingreso: ['', Validators.required]
    });

    // Verificar si estamos en modo edición
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.ingresoId = params['id'];
        this.isEditing = true;
        if (this.ingresoId) {
          this.cargarIngreso(this.ingresoId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadPacientes();
    this.loadPersonal();
    this.loadCamas();
  }

  private loadPacientes() {
    this.pacienteSrv.getPaciente().subscribe(
      (data: any) => {
        this.pacientes = Array.isArray(data) ? data : [];
      },
      (error: any) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

  private loadPersonal() {
    this.personalSrv.getPersonal().subscribe(
      (data: any) => {
        console.log('Personal recibido desde API:', data);
        this.personal = Array.isArray(data) ? data : [];
        console.log('Personal cargado en array:', this.personal);
      },
      (error: any) => {
        console.error('Error al cargar personal:', error);
        console.error('Detalles del error:', error.status, error.message);
        Swal.fire('Error', 'No se pudo cargar el personal médico. Verifica los permisos.', 'error');
      }
    );
  }

  private loadCamas() {
    this.camaSrv.getCama().subscribe(
      (data: any) => {
        this.camas = Array.isArray(data) ? data : [];
      },
      (error: any) => {
        console.error('Error al cargar camas:', error);
      }
    );
  }

  cargarIngreso(id: number | string) {
    this.ingresoSrv.getIngresoById(id).subscribe(
      (data) => {
        console.log('Ingreso cargado:', data);
        this.form.patchValue({
          id_paciente: data.id_paciente,
          id_cama: data.id_cama,
          id_medico_responsable: data.id_medico_responsable,
          fecha_ingreso: data.fecha_ingreso ? new Date(data.fecha_ingreso).toISOString().split('T')[0] : '',
          fecha_alta: data.fecha_alta ? new Date(data.fecha_alta).toISOString().split('T')[0] : '',
          motivo_ingreso: data.motivo_ingreso
        });
      },
      (error) => {
        console.error('Error al cargar ingreso:', error);
        Swal.fire('Error', 'No se pudo cargar el ingreso hospitalario', 'error');
        this.router.navigate(['/ingresos']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) return;

    let ingreso: any = {
      id_paciente: this.form.value.id_paciente,
      id_cama: this.form.value.id_cama,
      id_medico_responsable: this.form.value.id_medico_responsable,
      fecha_ingreso: this.form.value.fecha_ingreso,
      fecha_alta: this.form.value.fecha_alta || null,
      motivo_ingreso: this.form.value.motivo_ingreso
    };

    if (this.isEditing && this.ingresoId) {
      this.ingresoSrv.updateIngreso(this.ingresoId, ingreso).subscribe(
        () => {
          Swal.fire('Éxito', 'Ingreso hospitalario actualizado correctamente', 'success');
          this.router.navigate(['/ingresos']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el ingreso hospitalario', 'error');
        }
      );
    } else {
      this.ingresoSrv.addIngreso(ingreso).subscribe(
        () => {
          Swal.fire('Éxito', 'Ingreso hospitalario creado correctamente', 'success');
          this.router.navigate(['/ingresos']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          const serverMsg = error?.error?.error || error?.error || error?.message || JSON.stringify(error);
          Swal.fire('Error', `No se pudo crear el ingreso hospitalario\n${serverMsg}`, 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/ingresos']);
  }
}
