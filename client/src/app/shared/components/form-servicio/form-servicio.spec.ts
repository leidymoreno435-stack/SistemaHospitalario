import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServicio } from './form-servicio';

describe('FormServicio', () => {
  let component: FormServicio;
  let fixture: ComponentFixture<FormServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormServicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormServicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
