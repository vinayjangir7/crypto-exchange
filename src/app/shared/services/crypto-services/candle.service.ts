import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cryptoEndPoints } from '../../config/crypto-config';
import { Candle } from '../../models/crypto_models/candle.model';
import { Interval } from '../../models/crypto_models/interval.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class CandleService {
  constructor(private httpService: HttpService) {}

  getCandles(): Observable<Candle[]> {
    return this.httpService.get<Candle[]>(cryptoEndPoints.candles);
  }
}

export interface CandleQueryParams {
  exchange: string;
  interval: Interval;
  baseId: string;
  quoteId: string;
  start?: number;
  end?: number;
}
