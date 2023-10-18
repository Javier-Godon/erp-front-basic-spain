import { TestBed } from '@angular/core/testing';

import { ShipmentLineService } from './shipment-line.service';

describe('ShipmentLineService', () => {
  let service: ShipmentLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
