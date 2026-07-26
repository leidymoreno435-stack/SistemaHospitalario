import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamen } from './list-examen';

describe('ListExamen', () => {
  let component: ListExamen;
  let fixture: ComponentFixture<ListExamen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExamen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExamen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
