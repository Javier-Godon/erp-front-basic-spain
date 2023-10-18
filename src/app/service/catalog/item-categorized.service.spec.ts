import { TestBed } from '@angular/core/testing';

import { ItemCategorizedService } from './item-categorized.service';

describe('ItemCategorizedService', () => {
  let service: ItemCategorizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCategorizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
