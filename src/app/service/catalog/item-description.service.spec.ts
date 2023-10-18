import { TestBed } from '@angular/core/testing';

import { ItemDescriptionService } from './item-description.service';

describe('ItemDescriptionService', () => {
  let service: ItemDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
