import { TestBed } from '@angular/core/testing';

import { CategoryLinkService } from './category-link.service';

describe('CategoryLinkService', () => {
  let service: CategoryLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
