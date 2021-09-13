import { TestBed } from '@angular/core/testing';

import { VigenereService } from './vigenere.service';

describe('VigenereService', () => {
  let service: VigenereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigenereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
