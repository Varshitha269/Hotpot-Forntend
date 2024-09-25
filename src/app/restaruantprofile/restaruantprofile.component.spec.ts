import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaruantprofileComponent } from './restaruantprofile.component';

describe('RestaruantprofileComponent', () => {
  let component: RestaruantprofileComponent;
  let fixture: ComponentFixture<RestaruantprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaruantprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaruantprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
