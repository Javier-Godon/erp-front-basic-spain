import { TestBed } from '@angular/core/testing';

import { DeliveryLineService } from './delivery-line.service';

describe('DeliveryLineService', () => {
  let service: DeliveryLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
