import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCirugia } from './form-cirugia';

describe('FormCirugia', () => {
  let component: FormCirugia;
  let fixture: ComponentFixture<FormCirugia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCirugia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCirugia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
