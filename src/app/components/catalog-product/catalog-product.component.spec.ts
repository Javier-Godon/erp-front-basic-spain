import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogProductComponent } from './catalog-product.component';

describe('CatalogProductComponent', () => {
  let component: CatalogProductComponent;
  let fixture: ComponentFixture<CatalogProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
