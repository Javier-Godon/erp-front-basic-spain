import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogProductVendorComponent } from './catalog-product-vendor.component';

describe('CatalogProductVendorComponent', () => {
  let component: CatalogProductVendorComponent;
  let fixture: ComponentFixture<CatalogProductVendorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogProductVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogProductVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
