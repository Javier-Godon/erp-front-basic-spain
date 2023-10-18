import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonDetailedCardComponent } from './person-detailed-card.component';

describe('PersonDetailedCardComponent', () => {
  let component: PersonDetailedCardComponent;
  let fixture: ComponentFixture<PersonDetailedCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
