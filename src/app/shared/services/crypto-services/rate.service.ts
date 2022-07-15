import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cryptoEndPoints, ratesWithId } from '../../config/crypto-config';
import { Rate } from '../../models/crypto_models/rate.model';
import { HttpService } from '../http.service';

const CACHE_SIZE = environment.cacheSize;
const REFRESH_INTERVAL = environment.refreshInterval;

@Injectable({
  providedIn: 'root',
})
export class RateService {
  cache$!: Observable<Rate[]>;

  constructor(private httpService: HttpService) {}

  get rates(): Observable<Rate[]> {
    if (!this.cache$) {
      // Set up timer that ticks every X milliseconds
      const timer$ = timer(0, REFRESH_INTERVAL);

      // For each tick make an http request to fetch new data
      this.cache$ = timer$.pipe(
        switchMap((_) => this.getRates()),
        shareReplay(CACHE_SIZE)
      );
    }
    if (!this.cache$) {
      this.cache$ = this.getRates().pipe(shareReplay(1));
    }
    return this.cache$;
  }

  getRates(): Observable<Rate[]> {
    return this.httpService.get<Rate[]>(cryptoEndPoints.rates);
  }

  getRate(id: string): Observable<Rate> {
    return this.httpService.get<Rate>(ratesWithId(id));
  }
}
