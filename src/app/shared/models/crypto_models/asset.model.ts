export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  icon: string;
  [
    key: string
  ]: string /* Added to prevent compilation error 'Index signature of object type implicitly has an 'any' type'
  while accessing object property using square brackets */;
}
