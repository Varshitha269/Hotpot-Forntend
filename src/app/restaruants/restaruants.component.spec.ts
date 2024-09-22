import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaruantsComponent } from './restaruants.component';

describe('RestaruantsComponent', () => {
  let component: RestaruantsComponent;
  let fixture: ComponentFixture<RestaruantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaruantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaruantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
