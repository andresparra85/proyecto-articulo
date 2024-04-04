import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpacesComponent } from './add-spaces.component';

describe('AddSpacesComponent', () => {
  let component: AddSpacesComponent;
  let fixture: ComponentFixture<AddSpacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpacesComponent]
    });
    fixture = TestBed.createComponent(AddSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
