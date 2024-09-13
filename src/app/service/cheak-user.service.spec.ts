import { TestBed } from '@angular/core/testing';

import { CheakUserService } from './cheak-user.service';

describe('CheakUserService', () => {
  let service: CheakUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheakUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
