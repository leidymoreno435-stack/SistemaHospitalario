import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicios } from './lista-servicios';

describe('ListaServicios', () => {
  let component: ListaServicios;
  let fixture: ComponentFixture<ListaServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
