import { TestBed } from '@angular/core/testing';

import { AgendarMentoriaService } from './agendar-mentoria.service';

describe('AgendarMentoriaService', () => {
  let service: AgendarMentoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendarMentoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
