import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputPriceContainerComponent } from './input-price-container.component';

describe('InputPriceContainerComponent', () => {
  let component: InputPriceContainerComponent;
  let fixture: ComponentFixture<InputPriceContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPriceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPriceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
