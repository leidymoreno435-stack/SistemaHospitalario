import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamas } from './list-camas';

describe('ListCamas', () => {
  let component: ListCamas;
  let fixture: ComponentFixture<ListCamas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCamas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCamas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
