import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuoverviewComponent } from './menuoverview.component';

describe('MenuoverviewComponent', () => {
  let component: MenuoverviewComponent;
  let fixture: ComponentFixture<MenuoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
