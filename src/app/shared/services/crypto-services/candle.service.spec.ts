import { TestBed } from '@angular/core/testing';

import { CandleService } from './candle.service';

describe('CandleService', () => {
  let service: CandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
