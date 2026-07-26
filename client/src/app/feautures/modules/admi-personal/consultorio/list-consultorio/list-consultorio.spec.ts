import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultorio } from './list-consultorio';

describe('ListConsultorio', () => {
  let component: ListConsultorio;
  let fixture: ComponentFixture<ListConsultorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
