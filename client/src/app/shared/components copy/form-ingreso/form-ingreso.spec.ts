import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngreso } from './form-ingreso';

describe('FormIngreso', () => {
  let component: FormIngreso;
  let fixture: ComponentFixture<FormIngreso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIngreso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIngreso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
