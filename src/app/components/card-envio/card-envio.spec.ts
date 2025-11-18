import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEnvio } from './card-envio';

describe('CardEnvio', () => {
  let component: CardEnvio;
  let fixture: ComponentFixture<CardEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
