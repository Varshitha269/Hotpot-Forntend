import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestraruantDashboardComponent } from './restraruant-dashboard.component';

describe('RestraruantDashboardComponent', () => {
  let component: RestraruantDashboardComponent;
  let fixture: ComponentFixture<RestraruantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestraruantDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestraruantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
