import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../../core/services/usuarios/usuarios-service';
import { RolService } from '../../../../../core/services/usuarios/rol-service';

@Component({
  selector: 'app-form-usuarios',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-usuarios.html',
  styleUrl: './form-usuarios.css',
})
export class FormUsuarios implements OnInit {
  form: FormGroup;
  isEditing = false;
  usuarioId: number | null = null;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosSrv: UsuariosService,
    private rolSrv: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(80)]],
      password_hash: ['', [Validators.required]],
      id_rol: ['', [Validators.required]],
      activo: [true]
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.usuarioId = params['id'];
        this.isEditing = true;
        
        // Remove required validation from password if editing
        this.form.get('password_hash')?.clearValidators();
        this.form.get('password_hash')?.updateValueAndValidity();
        
        if (this.usuarioId) {
          this.cargarUsuario(this.usuarioId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.rolSrv.getAll().subscribe(
      (data: any) => this.roles = Array.isArray(data) ? data : data?.value || [],
      err => console.error('Error cargando roles', err)
    );
  }

  cargarUsuario(id: number | string) {
    this.usuariosSrv.getUsuarioById(id).subscribe(
      (data) => {
        this.form.patchValue({
          username: data.username,
          id_rol: data.id_rol,
          activo: data.activo
        });
      },
      (error) => {
        console.error('Error al cargar usuario:', error);
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
        this.router.navigate(['/usuarios']);
      }
    );
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
      return;
    }

    const usuario = { ...this.form.value };

    if (this.isEditing && this.usuarioId) {
      // Si está vacío, borrarlo para no actualizar
      if (!usuario.password_hash) {
        delete usuario.password_hash;
      }
      this.usuariosSrv.updateUsuario(this.usuarioId, usuario).subscribe(
        () => {
          Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
          this.router.navigate(['/usuarios']);
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        }
      );
    } else {
      this.usuariosSrv.addUsuario(usuario).subscribe(
        () => {
          Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          console.error('ERROR BACKEND:', error);
          Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}
