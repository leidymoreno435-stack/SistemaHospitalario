import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormMedicamentos } from './form-medicamentos/form-medicamentos';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../../../app.config';

@Component({
  selector: 'app-list-medicamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, FormMedicamentos],
  templateUrl: './list-medicamentos.html',
  styleUrls: ['./list-medicamentos.css'],
})
export class ListMedicamentos {
  medicamentos: any[] = [];
  showForm = false;
  selected: any = null;
  mode: 'add' | 'edit' = 'add';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    this.http.get<any>(`${API_BASE_URL}/medicamento`, { headers }).subscribe(
      (data: any) => {
        // soportar varias formas de respuesta: array directo, { rows: [...] }, { data: [...] }
        if (Array.isArray(data)) {
          this.medicamentos = data;
        } else if (Array.isArray(data?.rows)) {
          this.medicamentos = data.rows;
        } else if (Array.isArray(data?.data)) {
          this.medicamentos = data.data;
        } else if (Array.isArray(data?.medicamentos)) {
          this.medicamentos = data.medicamentos;
        } else {
          this.medicamentos = [];
        }
      },
      (err: any) => {
        console.error('Error cargando medicamentos', err);
        this.medicamentos = [];
      }
    );
  }

  openAdd() {
    this.mode = 'add';
    this.selected = { stock: 0 };
    this.showForm = true;
  }

  openEdit(m: any) {
    this.mode = 'edit';
    this.selected = { ...(m || {}) };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selected = null;
  }

  onSaved(res: any) {
    // refrescar la lista o actualizar localmente
    this.closeForm();
    this.loadMedicamentos();
  }

  deleteMedicamento(m: any) {
    if (!confirm('¿Eliminar medicamento?')) return;
    const id = m.id_medicamento || m.id;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    this.http.delete(`${API_BASE_URL}/medicamento/${id}`, { headers }).subscribe(
      () => {
        Swal.fire('Eliminado', `Medicamento eliminado correctamente`, 'success');
        this.loadMedicamentos();
      },
      err => {
        console.error('Error eliminando medicamento', err);
        Swal.fire('Error', 'No se pudo eliminar el medicamento', 'error');
      }
    );
  }
}
