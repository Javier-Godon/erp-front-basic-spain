import { TestBed } from '@angular/core/testing';

import { StrockControlLineService } from './strock-control-line.service';

describe('StrockControlLineService', () => {
  let service: StrockControlLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrockControlLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
