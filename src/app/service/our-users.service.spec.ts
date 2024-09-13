import { TestBed } from '@angular/core/testing';

import { OurUsersService } from './our-users.service';

describe('OurUsersService', () => {
  let service: OurUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
