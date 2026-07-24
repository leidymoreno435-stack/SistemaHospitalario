import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConsultas } from './lista-consultas';

describe('ListaConsultas', () => {
  let component: ListaConsultas;
  let fixture: ComponentFixture<ListaConsultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConsultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConsultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
