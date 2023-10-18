import { TestBed } from '@angular/core/testing';

import { PersonalLinksService } from './personal-links.service';

describe('PersonalLinksService', () => {
  let service: PersonalLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
