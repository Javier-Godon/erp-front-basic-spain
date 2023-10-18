import { TestBed } from '@angular/core/testing';

import { ItemDistinctiveFeatureService } from './item-distinctive-feature.service';

describe('ItemDistinctiveFeatureService', () => {
  let service: ItemDistinctiveFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDistinctiveFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
