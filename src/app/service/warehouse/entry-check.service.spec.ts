import { TestBed } from '@angular/core/testing';

import { EntryCheckService } from './entry-check.service';

describe('EntryCheckService', () => {
  let service: EntryCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
