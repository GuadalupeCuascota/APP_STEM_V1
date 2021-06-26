import { TestBed } from '@angular/core/testing';

import { RegistroCarrerasService } from './registro-carreras.service';

describe('RegistroCarrerasService', () => {
  let service: RegistroCarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroCarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
