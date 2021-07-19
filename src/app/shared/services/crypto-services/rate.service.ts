import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cryptoEndPoints, ratesWithId } from '../../config/crypto-config';
import { Rate } from '../../models/crypto_models/rate.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private httpService: HttpService) {}

  getRates(): Observable<Rate[]> {
    return this.httpService.get<Rate[]>(cryptoEndPoints.rates);
  }

  getRate(id: string): Observable<Rate> {
    return this.httpService.get<Rate>(ratesWithId(id));
  }
}
