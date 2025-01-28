export interface PriceDataPoint {
    price: string;
    time: string;
  }
  
  export interface HistoricalPriceResponse {
    data: {
      prices: PriceDataPoint[];
    };
  }
  
  export interface ExchangeRateResponse {
    data: {
      currency: string;
      rates: {
        [key: string]: string;
      };
    };
  }
  
  export interface ProcessedPricePoint {
    price: number;
    time: Date;
  }