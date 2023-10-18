import { TestBed } from '@angular/core/testing';

import { ItemRetailPriceService } from './item-retail-price.service';

describe('ItemRetailPriceService', () => {
  let service: ItemRetailPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRetailPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
