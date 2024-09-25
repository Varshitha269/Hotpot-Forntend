import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrordersComponent } from './listrorders.component';

describe('ListrordersComponent', () => {
  let component: ListrordersComponent;
  let fixture: ComponentFixture<ListrordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListrordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListrordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
