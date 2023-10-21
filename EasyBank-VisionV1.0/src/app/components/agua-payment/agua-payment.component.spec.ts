import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaPaymentComponent } from './agua-payment.component';

describe('AguaPaymentComponent', () => {
  let component: AguaPaymentComponent;
  let fixture: ComponentFixture<AguaPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AguaPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AguaPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
