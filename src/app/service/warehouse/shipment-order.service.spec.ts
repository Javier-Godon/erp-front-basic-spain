import { TestBed } from '@angular/core/testing';

import { ShipmentOrderService } from './shipment-order.service';

describe('ShipmentOrderService', () => {
  let service: ShipmentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
