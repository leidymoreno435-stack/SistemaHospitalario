import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-servicio',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-servicio.html',
  styleUrl: './form-servicio.css',
})
export class FormServicio {
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
  this.router.navigate(['/servicios']);
  }
}
