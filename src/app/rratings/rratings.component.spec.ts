import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RratingsComponent } from './rratings.component';

describe('RratingsComponent', () => {
  let component: RratingsComponent;
  let fixture: ComponentFixture<RratingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RratingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
