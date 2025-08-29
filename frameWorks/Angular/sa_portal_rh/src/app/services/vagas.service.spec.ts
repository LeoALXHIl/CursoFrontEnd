import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VagasService } from './vagas.service';
import { vaga } from '../models/vaga.model';

describe('VagasService', () => {
  let service: VagasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VagasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve cadastrar uma vaga', () => {
    const vagaMock: vaga = { /* preencha os campos necessários do model */ } as vaga;
    service.cadastrarVaga(vagaMock).subscribe(response => {
      expect(response).toEqual(vagaMock);
    });
    const req = httpMock.expectOne('http://localhost:3000/vagas');
    expect(req.request.method).toBe('POST');
    req.flush(vagaMock);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
