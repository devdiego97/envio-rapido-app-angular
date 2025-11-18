import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnvio } from './update-envio';

describe('UpdateEnvio', () => {
  let component: UpdateEnvio;
  let fixture: ComponentFixture<UpdateEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
