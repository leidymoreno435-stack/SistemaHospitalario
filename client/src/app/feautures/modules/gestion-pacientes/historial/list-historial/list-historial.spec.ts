import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistorial } from './list-historial';

describe('ListHistorial', () => {
  let component: ListHistorial;
  let fixture: ComponentFixture<ListHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
