import { TestBed } from '@angular/core/testing';

import { RestreportsService } from './restreports.service';

describe('RestreportsService', () => {
  let service: RestreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
