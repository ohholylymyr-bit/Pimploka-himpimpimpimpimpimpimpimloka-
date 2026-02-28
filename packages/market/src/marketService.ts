// packages/market/src/marketService.ts
export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  price: number; // EUR
  type: 'CRYPTO' | 'STOCK' | 'FINNISH_INVEST';
}

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    // Init with dummy data
    for (let i = 1; i <= 10; i++) {
      this.assets.push({
        id: `crypto${i}`,
        name: `CryptoCoin ${i}`,
        symbol: `CC${i}`,
        price: Math.random() * 100,
        type: 'CRYPTO'
      });
    }
    for (let i = 1; i <= 50; i++) {
      this.assets.push({
        id: `stock${i}`,
        name: `GlobalStock ${i}`,
        symbol: `GS${i}`,
        price: Math.random() * 200,
        type: 'STOCK'
      });
    }
  }

  getAssetById(id: string): MarketAsset | undefined {
    return this.assets.find(a => a.id === id);
  }

  getAllAssets(): MarketAsset[] {
    return this.assets;
  }

  simulatePriceChanges() {
    this.assets = this.assets.map(a => ({
      ...a,
      price: +(a.price * (0.95 + Math.random() * 0.1)).toFixed(2)
    }));
  }
}
