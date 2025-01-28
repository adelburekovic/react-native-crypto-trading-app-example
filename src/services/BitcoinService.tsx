import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

export class BitcoinError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'BitcoinError';
  }
}

interface PriceDataPoint {
  price: string;
  time: string;
}

interface HistoricalPriceResponse {
  data: {
    prices: PriceDataPoint[];
  };
}

interface ExchangeRateResponse {
  data: {
    currency: string;
    rates: {
      [key: string]: string;
    };
  };
}

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
        } catch {
          // If parsing error response fails, use status text
          errorMessage = response.statusText || errorMessage;
        }

        throw new BitcoinError(
          errorMessage,
          'API_ERROR',
          response.status
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof BitcoinError) {
        throw error;
      }

      if (error instanceof TypeError) {
        throw new BitcoinError(
          'Network connection failed',
          'NETWORK_ERROR'
        );
      }

      throw new BitcoinError(
        'An unexpected error occurred',
        'UNKNOWN_ERROR'
      );
    }
  }

  static async fetchHistoricalPrices(): Promise<LineChartData> {
    try {
      const data = await this.fetchWithErrorHandling<HistoricalPriceResponse>(
        `${this.BASE_URL}/prices/BTC-EUR/historic`
      );

      if (!data.data?.prices || !Array.isArray(data.data.prices)) {
        throw new BitcoinError(
          'Invalid data format received',
          'DATA_FORMAT_ERROR'
        );
      }

      // Sort prices by time and take last 6 data points
      const sortedPrices = data.data.prices
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      console.log('Sorted Prices:', JSON.stringify(sortedPrices, null, 2));

      if (sortedPrices.length === 0) {
        throw new BitcoinError(
          'No price data available',
          'NO_DATA_ERROR'
        );
      }

      // Format data for the chart
      return {
        labels: sortedPrices.map(point => {
          const price = parseFloat(point.price).toFixed(0);
          return price;
        }),
        datasets: [{
          data: sortedPrices.map(point => parseFloat(point.price)),
          color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
          strokeWidth: 2
        }]
      };
    } catch (error) {
      console.error('Error in fetchHistoricalPrices:', error);
      throw error;
    }
  }

  static async getCurrentPrice(): Promise<number> {
    const data = await this.fetchWithErrorHandling<ExchangeRateResponse>(
      `${this.BASE_URL}/exchange-rates?currency=BTC`
    );

    const eurRate = data.data?.rates?.EUR;
    if (!eurRate) {
      throw new BitcoinError(
        'EUR rate not available',
        'MISSING_RATE_ERROR'
      );
    }

    const price = parseFloat(eurRate);
    if (isNaN(price)) {
      throw new BitcoinError(
        'Invalid price format',
        'PRICE_FORMAT_ERROR'
      );
    }

    return price;
  }

  static formatPrice(value: number): string {
    try {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } catch {
      return `€${value.toFixed(2)}`;
    }
  }
}