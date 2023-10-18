import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicCatalogComponent } from './basic-catalog.component';

describe('BasicCatalogComponent', () => {
  let component: BasicCatalogComponent;
  let fixture: ComponentFixture<BasicCatalogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
