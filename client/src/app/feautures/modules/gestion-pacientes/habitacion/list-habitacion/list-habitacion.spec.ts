import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHabitacion } from './list-habitacion';

describe('ListHabitacion', () => {
  let component: ListHabitacion;
  let fixture: ComponentFixture<ListHabitacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHabitacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHabitacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
