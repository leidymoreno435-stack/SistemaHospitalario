import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIngresoHospitalario } from './lista-ingreso-hospitalario';

describe('ListaIngresoHospitalario', () => {
  let component: ListaIngresoHospitalario;
  let fixture: ComponentFixture<ListaIngresoHospitalario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaIngresoHospitalario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaIngresoHospitalario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
