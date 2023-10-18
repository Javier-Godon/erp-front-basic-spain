import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonMainAndListComponent } from './person-main-and-list.component';

describe('PersonMainAndListComponent', () => {
  let component: PersonMainAndListComponent;
  let fixture: ComponentFixture<PersonMainAndListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonMainAndListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMainAndListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
