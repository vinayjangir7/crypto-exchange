export const assetEndPoints = (id: string) => {
  return {
    assetsWithId: `assets/${id}`,
    assetsHistory: `assets/${id}/history`,
    assetsMarkets: `assets/${id}/markets`,
  };
};

export const ratesWithId = (id: string) => `rates/${id}`;

export const exchangesWithId = (id: string) => `exchanges/${id}`;

export const cryptoEndPoints = {
  assets: 'assets',
  rates: 'rates',
  exchanges: 'exchanges',
  markets: 'markets',
  candles: 'candles',
};
