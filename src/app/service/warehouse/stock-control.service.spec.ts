import { TestBed } from '@angular/core/testing';

import { StockControlService } from './stock-control.service';

describe('StockControlService', () => {
  let service: StockControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
