import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantoverviewComponent } from './restuarantoverview.component';

describe('RestuarantoverviewComponent', () => {
  let component: RestuarantoverviewComponent;
  let fixture: ComponentFixture<RestuarantoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestuarantoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestuarantoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
