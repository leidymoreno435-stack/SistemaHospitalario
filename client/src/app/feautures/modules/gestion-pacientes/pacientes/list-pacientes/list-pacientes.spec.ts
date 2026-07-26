import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientes } from './list-pacientes';

describe('ListPacientes', () => {
  let component: ListPacientes;
  let fixture: ComponentFixture<ListPacientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPacientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPacientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
