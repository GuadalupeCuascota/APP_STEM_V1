import { TestBed } from '@angular/core/testing';

import { RegistroPublicacionService } from './registro-publicacion.service';

describe('RegistroPublicacionService', () => {
  let service: RegistroPublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
