import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingordersComponent } from './ongoingorders.component';

describe('OngoingordersComponent', () => {
  let component: OngoingordersComponent;
  let fixture: ComponentFixture<OngoingordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
