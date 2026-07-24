import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonal } from './list-personal';

describe('ListPersonal', () => {
  let component: ListPersonal;
  let fixture: ComponentFixture<ListPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});