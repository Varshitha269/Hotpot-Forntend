import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaymentsComponent } from './listpayments.component';

describe('ListpaymentsComponent', () => {
  let component: ListpaymentsComponent;
  let fixture: ComponentFixture<ListpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
