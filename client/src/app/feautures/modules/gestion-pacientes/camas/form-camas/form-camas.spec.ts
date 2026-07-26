import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCamas } from './form-camas';

describe('FormCamas', () => {
  let component: FormCamas;
  let fixture: ComponentFixture<FormCamas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCamas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCamas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
