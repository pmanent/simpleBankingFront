import { TestBed } from '@angular/core/testing';

import { SimpleBankServiceService } from './simple-bank-service.service';

describe('SimpleBankServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimpleBankServiceService = TestBed.get(SimpleBankServiceService);
    expect(service).toBeTruthy();
  });
});
