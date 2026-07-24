import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngresos } from './form-ingresos';

describe('FormIngresos', () => {
  let component: FormIngresos;
  let fixture: ComponentFixture<FormIngresos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIngresos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIngresos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
