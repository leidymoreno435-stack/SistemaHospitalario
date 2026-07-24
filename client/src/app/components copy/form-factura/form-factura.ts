import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-factura',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-factura.html',
  styleUrl: './form-factura.css',
})
export class FormFactura {
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
  this.router.navigate(['/factura']);
  }
}
