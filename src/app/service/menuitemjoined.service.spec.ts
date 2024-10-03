import { TestBed } from '@angular/core/testing';

import { MenuitemjoinedService } from './menuitemjoined.service';

describe('MenuitemjoinedService', () => {
  let service: MenuitemjoinedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuitemjoinedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
