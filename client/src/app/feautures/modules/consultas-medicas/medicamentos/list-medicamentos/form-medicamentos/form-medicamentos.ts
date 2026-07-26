import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../../../../../app.config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-medicamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-medicamentos.html'
})
export class FormMedicamentos {
  @Input() medicamento: any = {};
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() saved = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  model: any = {};

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    this.model = { ...(this.medicamento || {}) };
  }

  save() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
    if (this.mode === 'add') {
      const payload = {
        nombre_comercial: this.model.nombre || this.model.nombre_comercial,
        principio_activo: this.model.principio_activo,
        presentacion: this.model.presentacion,
        stock: Number(this.model.stock) || 0,
        precio_unitario: this.model.precio_unitario || this.model.precio || 0,
      };
      this.http.post<any>(`${API_BASE_URL}/medicamento`, payload, { headers }).subscribe(
        res => {
          Swal.fire('Éxito', 'Medicamento agregado correctamente', 'success');
          this.saved.emit(res);
        },
        err => {
          console.error('Error creando medicamento', err);
          const serverMsg = err?.error?.error || err?.error || err?.message || JSON.stringify(err);
          Swal.fire('Error', `No se pudo crear el medicamento\n${serverMsg}`, 'error');
          this.saved.emit(null);
        }
      );
    } else {
      // edit: sólo actualizar stock
      const payload = { stock: this.model.stock };
      const id = this.model.id_medicamento || this.model.id;
      this.http.put<any>(`${API_BASE_URL}/medicamento/${id}`, payload, { headers }).subscribe(
        res => {
          Swal.fire('Éxito', 'Stock actualizado correctamente', 'success');
          this.saved.emit(res);
        },
        err => {
          console.error('Error actualizando medicamento', err);
          const serverMsg = err?.error?.error || err?.error || err?.message || JSON.stringify(err);
          Swal.fire('Error', `No se pudo actualizar el medicamento\n${serverMsg}`, 'error');
          this.saved.emit(null);
        }
      );
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
