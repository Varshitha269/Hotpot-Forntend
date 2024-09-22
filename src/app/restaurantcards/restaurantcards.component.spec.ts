import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantcardsComponent } from './restaurantcards.component';

describe('RestaurantcardsComponent', () => {
  let component: RestaurantcardsComponent;
  let fixture: ComponentFixture<RestaurantcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
