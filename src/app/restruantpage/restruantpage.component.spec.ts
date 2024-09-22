import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestruantpageComponent } from './restruantpage.component';

describe('RestruantpageComponent', () => {
  let component: RestruantpageComponent;
  let fixture: ComponentFixture<RestruantpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestruantpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestruantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
