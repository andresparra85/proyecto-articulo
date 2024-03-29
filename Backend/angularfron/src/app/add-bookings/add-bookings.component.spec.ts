import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingsComponent } from './add-bookings.component';

describe('AddBookingsComponent', () => {
  let component: AddBookingsComponent;
  let fixture: ComponentFixture<AddBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookingsComponent]
    });
    fixture = TestBed.createComponent(AddBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
