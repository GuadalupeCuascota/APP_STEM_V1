import { TestBed } from '@angular/core/testing';

import { TestAptitudService } from './test-aptitud.service';

describe('TestAptitudService', () => {
  let service: TestAptitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAptitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
