import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { assetEndPoints, cryptoEndPoints } from '../../config/crypto-config';
import { AssetHistory } from '../../models/crypto_models/asset-history.model';

import { Asset } from '../../models/crypto_models/asset.model';
import { Interval } from '../../models/crypto_models/interval.model';
import { Market } from '../../models/crypto_models/market.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private httpService: HttpService) {}

  getAssets(): Observable<Asset[]> {
    return this.httpService.get<Asset[]>(cryptoEndPoints.assets);
  }

  getAsset(id: string): Observable<Asset> {
    return this.httpService.get<Asset>(assetEndPoints(id).assetsWithId);
  }

  getAssetHistory(id: string): Observable<AssetHistory[]> {
    return this.httpService.get<AssetHistory[]>(
      assetEndPoints(id).assetsHistory
    );
  }

  getAssetMarkets(id: string): Observable<Market[]> {
    return this.httpService.get<Market[]>(assetEndPoints(id).assetsMarkets);
  }
}

export interface AssetQueryParams {
  search?: string;
  ids?: string[]; // comma separated strings
  limit?: number;
  offset?: number;

  interval: Interval;
  start?: number;
  end?: number;

  // assets - search?, ids?, limit?, offset?
  // history - id, interval, start?, end?
  // markets - id, limit?, offset?
}
