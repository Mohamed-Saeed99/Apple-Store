import { TestBed } from '@angular/core/testing';

import { UserSginGuard } from './user-sgin.guard';

describe('UserSginGuard', () => {
  let guard: UserSginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserSginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
