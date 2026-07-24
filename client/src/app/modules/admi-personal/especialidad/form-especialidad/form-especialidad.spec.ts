import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEspecialidad } from './form-especialidad';

describe('FormEspecialidad', () => {
  let component: FormEspecialidad;
  let fixture: ComponentFixture<FormEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEspecialidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
