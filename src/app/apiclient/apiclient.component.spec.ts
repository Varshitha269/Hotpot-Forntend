import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiclientComponent } from './apiclient.component';

describe('ApiclientComponent', () => {
  let component: ApiclientComponent;
  let fixture: ComponentFixture<ApiclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
