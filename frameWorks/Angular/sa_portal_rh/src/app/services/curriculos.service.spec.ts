import { TestBed } from '@angular/core/testing';

import { curriculosService } from './curriculos.service';

describe('VagasService', () => {
  let service: curriculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(curriculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
