import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewProductCategoryDialogComponent } from './new-product-category-dialog.component';

describe('NewProductCategoryDialogComponent', () => {
  let component: NewProductCategoryDialogComponent;
  let fixture: ComponentFixture<NewProductCategoryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
