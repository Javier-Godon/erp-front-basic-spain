import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewProductDialogComponent } from './new-product-dialog.component';

describe('NewProductDialogComponent', () => {
  let component: NewProductDialogComponent;
  let fixture: ComponentFixture<NewProductDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
