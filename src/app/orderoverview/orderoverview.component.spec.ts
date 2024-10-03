import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderoverviewComponent } from './orderoverview.component';

describe('OrderoverviewComponent', () => {
  let component: OrderoverviewComponent;
  let fixture: ComponentFixture<OrderoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
