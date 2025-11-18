import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnvio } from './add-envio';

describe('AddEnvio', () => {
  let component: AddEnvio;
  let fixture: ComponentFixture<AddEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
