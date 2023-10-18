import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonLinksDialogComponent } from './person-links-dialog.component';

describe('PersonLinksDialogComponent', () => {
  let component: PersonLinksDialogComponent;
  let fixture: ComponentFixture<PersonLinksDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonLinksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
