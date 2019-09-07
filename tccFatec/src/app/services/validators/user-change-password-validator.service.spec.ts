import { TestBed } from '@angular/core/testing';

import { UserChangePasswordValidatorService } from './user-change-password-validator.service';

describe('UserChangePasswordValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserChangePasswordValidatorService = TestBed.get(UserChangePasswordValidatorService);
    expect(service).toBeTruthy();
  });
});
