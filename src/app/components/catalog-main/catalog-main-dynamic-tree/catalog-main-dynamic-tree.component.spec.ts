import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogMainDynamicTreeComponent } from './catalog-main-dynamic-tree.component';

describe('CatalogMainDynamicTreeComponent', () => {
  let component: CatalogMainDynamicTreeComponent;
  let fixture: ComponentFixture<CatalogMainDynamicTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogMainDynamicTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogMainDynamicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
