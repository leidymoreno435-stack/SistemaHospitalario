import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultorio } from './form-consultorio';

describe('FormConsultorio', () => {
  let component: FormConsultorio;
  let fixture: ComponentFixture<FormConsultorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConsultorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsultorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
