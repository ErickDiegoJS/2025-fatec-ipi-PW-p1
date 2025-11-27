import { TestBed } from '@angular/core/testing';

import { ImovelService } from './imovel';

describe('Imovel', () => {
  let service: ImovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
