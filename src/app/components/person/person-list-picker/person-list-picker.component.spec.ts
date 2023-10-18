import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonListPickerComponent } from './person-list-picker.component';

describe('PersonListPickerComponent', () => {
  let component: PersonListPickerComponent;
  let fixture: ComponentFixture<PersonListPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
