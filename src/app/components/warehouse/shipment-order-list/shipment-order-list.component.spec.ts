import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOrderListComponent } from './shipment-order-list.component';

describe('ShipmentOrderListComponent', () => {
  let component: ShipmentOrderListComponent;
  let fixture: ComponentFixture<ShipmentOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
