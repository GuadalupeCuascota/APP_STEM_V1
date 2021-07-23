import { TestBed } from '@angular/core/testing';

import { RegistroMentoriasService } from './registro-mentorias.service';

describe('RegistroMentoriasService', () => {
  let service: RegistroMentoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMentoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
