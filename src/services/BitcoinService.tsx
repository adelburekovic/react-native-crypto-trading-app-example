import {
  ExchangeRateResponse,
  HistoricalPriceResponse,
  ProcessedPricePoint
} from '../types/bitcoinService.types';
import {
  APIError,
  DataFormatError,
  NetworkError,
  NoDataError,
  PriceFormatError
} from '../types/errors';

export class BitcoinService {
  private static readonly BASE_URL = 'https://api.coinbase.com/v2';

  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        let errorMessage = 'Failed to fetch data';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new APIError(errorMessage, response.status);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      if (error instanceof TypeError) {
        throw new NetworkError(error.message, error);
      }
      throw error;
    }
  }

  private static validateAndParsePrice(priceStr: string): number {
    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      throw new PriceFormatError(`Invalid price value: ${priceStr}`);
    }
    return price;
  }

  public static async fetchHistoricalPrices(): Promise<ProcessedPricePoint[]> {
    const data = await this.fetchWithErrorHandling<HistoricalPriceResponse>(
      `${this.BASE_URL}/prices/BTC-EUR/historic`
    );

    if (!data.data?.prices || !Array.isArray(data.data.prices)) {
      throw new DataFormatError('Invalid historical price data format');
    }

    if (data.data.prices.length === 0) {
      throw new NoDataError('No historical price data available');
    }

    return data.data.prices
      .map(point => ({
        price: this.validateAndParsePrice(point.price),
        time: new Date(point.time)
      }))
      .sort((a, b) => a.time.getTime() - b.time.getTime());
  }

  public static async getCurrentPrice(): Promise<number> {
    const data = await this.fetchWithErrorHandling<ExchangeRateResponse>(
      `${this.BASE_URL}/exchange-rates?currency=BTC`
    );

    const eurRate = data.data?.rates?.EUR;
    if (!eurRate) {
      throw new DataFormatError('EUR rate not available in response');
    }

    return this.validateAndParsePrice(eurRate);
  }
}