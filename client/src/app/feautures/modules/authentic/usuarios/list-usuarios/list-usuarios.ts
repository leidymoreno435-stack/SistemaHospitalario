import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../../core/services/usuarios/usuarios-service';

@Component({
  selector: 'app-list-usuarios',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-usuarios.html',
  styleUrl: './list-usuarios.css',
})
export class ListUsuarios implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  private loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (data: any) => {
        this.usuarios = Array.isArray(data) ? data : data?.value || [];
      },
      (error: any) => {
        console.error('Error al cargar usuarios:', error);
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      }
    );
  }

  editarUsuario(id: number | string) {
    this.router.navigate(['/nuevo-usuario'], { queryParams: { id } });
  }

  eliminarUsuario(id: number | string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el usuario con ID ${id}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.deleteUsuario(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            this.loadUsuarios();
          },
          (error: any) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }
}
