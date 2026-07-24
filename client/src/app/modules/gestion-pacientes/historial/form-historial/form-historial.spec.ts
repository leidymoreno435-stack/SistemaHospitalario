import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistorial } from './form-historial';

describe('FormHistorial', () => {
  let component: FormHistorial;
  let fixture: ComponentFixture<FormHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
