import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultas } from './list-consultas';

describe('ListConsultas', () => {
  let component: ListConsultas;
  let fixture: ComponentFixture<ListConsultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
