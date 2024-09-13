import { TestBed } from '@angular/core/testing';

import { HalfadminService } from './halfadmin.service';

describe('HalfadminService', () => {
  let service: HalfadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HalfadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
