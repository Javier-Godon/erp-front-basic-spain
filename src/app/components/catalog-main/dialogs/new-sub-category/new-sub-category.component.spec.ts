import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewSubCategoryComponent } from './new-sub-category.component';

describe('NewSubCategoryComponent', () => {
  let component: NewSubCategoryComponent;
  let fixture: ComponentFixture<NewSubCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
