import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngresos } from './list-ingresos';

describe('ListIngresos', () => {
  let component: ListIngresos;
  let fixture: ComponentFixture<ListIngresos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIngresos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIngresos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
