import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-habitacion',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-habitacion.html',
  styleUrl: './form-habitacion.css',
})
export class FormHabitacion {
form: any; 

constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
   
    this.form = this.fb.group({
    });
  }

guardar() {
    if (this.form.invalid) return;
    
  }

  volver() {
  this.router.navigate(['/habitacion']);
  }
}
