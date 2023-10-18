import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductDetailedCardDialogComponent } from './product-detailed-card-dialog.component';

describe('ProductDetailedCardDialogComponent', () => {
  let component: ProductDetailedCardDialogComponent;
  let fixture: ComponentFixture<ProductDetailedCardDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailedCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailedCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
