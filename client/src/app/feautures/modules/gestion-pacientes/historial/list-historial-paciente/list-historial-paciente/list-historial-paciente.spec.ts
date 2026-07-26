import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistorialPaciente } from './list-historial-paciente';

describe('ListHistorialPaciente', () => {
  let component: ListHistorialPaciente;
  let fixture: ComponentFixture<ListHistorialPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHistorialPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHistorialPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
