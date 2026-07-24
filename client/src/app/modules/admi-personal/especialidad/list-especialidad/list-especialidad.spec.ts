import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspecialidad } from './list-especialidad';

describe('ListEspecialidad', () => {
  let component: ListEspecialidad;
  let fixture: ComponentFixture<ListEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEspecialidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
