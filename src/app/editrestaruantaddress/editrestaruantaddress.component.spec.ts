import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrestaruantaddressComponent } from './editrestaruantaddress.component';

describe('EditrestaruantaddressComponent', () => {
  let component: EditrestaruantaddressComponent;
  let fixture: ComponentFixture<EditrestaruantaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditrestaruantaddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrestaruantaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
