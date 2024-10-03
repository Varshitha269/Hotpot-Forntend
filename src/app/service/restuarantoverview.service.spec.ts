import { TestBed } from '@angular/core/testing';

import { RestuarantoverviewService } from './restuarantoverview.service';

describe('RestuarantoverviewService', () => {
  let service: RestuarantoverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestuarantoverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
