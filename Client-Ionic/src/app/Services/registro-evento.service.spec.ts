import { TestBed } from '@angular/core/testing';

import { RegistroEventoService } from './registro-evento.service';

describe('RegistroEventoService', () => {
  let service: RegistroEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
