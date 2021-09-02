import { TestBed } from '@angular/core/testing';

import { SolicitudMentoriaService } from './solicitud-mentoria.service';

describe('SolicitudMentoriaService', () => {
  let service: SolicitudMentoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudMentoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
