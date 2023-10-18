import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeletePersonDialogComponent } from './delete-person-dialog.component';

describe('DeletePersonDialogComponent', () => {
  let component: DeletePersonDialogComponent;
  let fixture: ComponentFixture<DeletePersonDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePersonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
