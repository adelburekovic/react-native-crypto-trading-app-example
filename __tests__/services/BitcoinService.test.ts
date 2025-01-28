import { BitcoinService } from "../../src/services/BitcoinService";
import { APIError, DataFormatError, NetworkError, NoDataError, PriceFormatError } from "../../src/types/errors";

describe('BitcoinService', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchHistoricalPrices', () => {
    const mockValidResponse = {
      data: {
        prices: [
          { price: '30000.00', time: '2024-01-01T00:00:00Z' },
          { price: '31000.00', time: '2024-01-02T00:00:00Z' },
          { price: '32000.00', time: '2024-01-03T00:00:00Z' }
        ]
      }
    };

    it('should return processed price data when API call is successful', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockValidResponse)
      });

      const result = await BitcoinService.fetchHistoricalPrices();

      expect(result).toEqual([
        { price: 30000, time: new Date('2024-01-01T00:00:00Z') },
        { price: 31000, time: new Date('2024-01-02T00:00:00Z') },
        { price: 32000, time: new Date('2024-01-03T00:00:00Z') }
      ]);
    });

    it('should sort prices by time', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: {
            prices: [
              { price: '32000.00', time: '2024-01-03T00:00:00Z' },
              { price: '30000.00', time: '2024-01-01T00:00:00Z' },
              { price: '31000.00', time: '2024-01-02T00:00:00Z' }
            ]
          }
        })
      });

      const result = await BitcoinService.fetchHistoricalPrices();
      
      expect(result.map(p => p.time)).toEqual([
        new Date('2024-01-01T00:00:00Z'),
        new Date('2024-01-02T00:00:00Z'),
        new Date('2024-01-03T00:00:00Z')
      ]);
    });

    it('should throw APIError when API returns error status', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Resource not found' })
      };

      mockFetch.mockResolvedValueOnce(mockErrorResponse);

      const promise = BitcoinService.fetchHistoricalPrices();
      
      await expect(promise).rejects.toThrow(APIError);
      await expect(promise).rejects.toMatchObject({
        message: 'API Error (404): Resource not found'
      });
    });

    it('should throw DataFormatError when response format is invalid', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { invalid: 'format' } })
      });

      await expect(BitcoinService.fetchHistoricalPrices())
        .rejects
        .toThrow(DataFormatError);
    });

    it('should throw NoDataError when no price data is available', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { prices: [] } })
      });

      await expect(BitcoinService.fetchHistoricalPrices())
        .rejects
        .toThrow(NoDataError);
    });

    it('should throw NetworkError on network failure', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(BitcoinService.fetchHistoricalPrices())
        .rejects
        .toThrow(NetworkError);
    });

    it('should throw PriceFormatError when price cannot be parsed', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: {
            prices: [{ price: 'invalid', time: '2024-01-01T00:00:00Z' }]
          }
        })
      });

      await expect(BitcoinService.fetchHistoricalPrices())
        .rejects
        .toThrow(PriceFormatError);
    });
  });

  describe('getCurrentPrice', () => {
    const mockValidResponse = {
      data: {
        currency: 'BTC',
        rates: {
          EUR: '35000.00'
        }
      }
    };

    it('should return current price when API call is successful', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockValidResponse)
      });

      const result = await BitcoinService.getCurrentPrice();
      expect(result).toBe(35000);
    });

    it('should throw DataFormatError when EUR rate is missing', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: { rates: {} } })
      });

      await expect(BitcoinService.getCurrentPrice())
        .rejects
        .toThrow(DataFormatError);
    });

    it('should throw PriceFormatError when price format is invalid', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ 
          data: { 
            rates: { 
              EUR: 'invalid' 
            } 
          } 
        })
      });

      await expect(BitcoinService.getCurrentPrice())
        .rejects
        .toThrow(PriceFormatError);
    });

    it('should throw APIError with status code when API fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ message: 'Server error' })
      });

      await expect(BitcoinService.getCurrentPrice())
        .rejects
        .toMatchObject({
          message: 'API Error (500): Server error'
        });
    });
  });
});