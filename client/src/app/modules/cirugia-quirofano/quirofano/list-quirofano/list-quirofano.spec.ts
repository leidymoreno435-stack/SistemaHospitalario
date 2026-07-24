import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuirofano } from './list-quirofano';

describe('ListQuirofano', () => {
  let component: ListQuirofano;
  let fixture: ComponentFixture<ListQuirofano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuirofano]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuirofano);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
