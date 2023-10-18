import { TestBed } from '@angular/core/testing';

import { ReceiptLineService } from './receipt-line.service';

describe('ReceiptLineService', () => {
  let service: ReceiptLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
