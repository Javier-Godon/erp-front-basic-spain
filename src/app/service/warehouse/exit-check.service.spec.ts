import { TestBed } from '@angular/core/testing';

import { ExitCheckService } from './exit-check.service';

describe('ExitCheckService', () => {
  let service: ExitCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
