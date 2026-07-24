import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultasPaciente } from './list-consultas-paciente';

describe('ListConsultasPaciente', () => {
  let component: ListConsultasPaciente;
  let fixture: ComponentFixture<ListConsultasPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultasPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultasPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
