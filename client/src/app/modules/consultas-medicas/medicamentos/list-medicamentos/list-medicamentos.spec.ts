import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicamentos } from './list-medicamentos';

describe('ListMedicamentos', () => {
  let component: ListMedicamentos;
  let fixture: ComponentFixture<ListMedicamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMedicamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
