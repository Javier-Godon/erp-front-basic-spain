import { TestBed } from '@angular/core/testing';

import { DeliveryDirectionsService } from './delivery-directions.service';

describe('DeliveryDirectionsService', () => {
  let service: DeliveryDirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryDirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
