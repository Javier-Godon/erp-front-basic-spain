import { TestBed } from '@angular/core/testing';

import { EmailAddressService } from './email-address.service';

describe('EmailAddressService', () => {
  let service: EmailAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
