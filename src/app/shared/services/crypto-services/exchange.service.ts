import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { cryptoEndPoints, exchangesWithId } from '../../config/crypto-config';
import { Exchange } from '../../models/crypto_models/exchange.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private httpService: HttpService) {}

  getExchanges(): Observable<Exchange> {
    return this.httpService
      .get<Exchange>(cryptoEndPoints.exchanges)
      .pipe(shareReplay(1));
  }

  getExchange(id: string): Observable<Exchange> {
    return this.httpService.get<Exchange>(exchangesWithId(id));
  }
}
