import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cryptoEndPoints } from '../../config/crypto-config';
import { Market } from '../../models/crypto_models/market.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private httpService: HttpService) {}

  endPoint = `cryptoEndPoints.markets/$`;

  getMarkets(): Observable<Market[]> {
    return this.httpService.get<Market[]>(cryptoEndPoints.markets);
  }
}

export interface MarketQueryParams {
  exchangeId?: string;
  baseSymbol?: string;
  quoteSymbol?: string;
  baseId?: string;
  quoteId?: string;
  assetSymbol?: string;
  assetId?: string;
  limit?: number;
  offset?: number;
}
