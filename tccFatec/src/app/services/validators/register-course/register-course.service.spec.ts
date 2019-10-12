import { TestBed } from '@angular/core/testing';

import { RegisterCourseService } from './register-course.service';

describe('RegisterCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterCourseService = TestBed.get(RegisterCourseService);
    expect(service).toBeTruthy();
  });
});
