import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsulta } from './form-consulta';

describe('FormConsulta', () => {
  let component: FormConsulta;
  let fixture: ComponentFixture<FormConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
