import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoles } from './form-roles';

describe('FormRoles', () => {
  let component: FormRoles;
  let fixture: ComponentFixture<FormRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
