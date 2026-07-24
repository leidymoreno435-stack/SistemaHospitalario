import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHabitaciones } from './lista-habitaciones';

describe('ListaHabitaciones', () => {
  let component: ListaHabitaciones;
  let fixture: ComponentFixture<ListaHabitaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHabitaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHabitaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
