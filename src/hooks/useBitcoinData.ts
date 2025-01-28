import { useState, useEffect, useCallback } from 'react';
import { BitcoinService } from '../services/BitcoinService';
import { ProcessedPricePoint } from '../types/bitcoinService.types';
import { BitcoinBaseError } from '../types/errors';

interface UseBitcoinDataReturn {
  historicalPrices: ProcessedPricePoint[];
  currentPrice: number;
  loading: boolean;
  error: BitcoinBaseError | null;
  refetch: () => Promise<void>;
}

export const useBitcoinData = (
  updateInterval = 60000
): UseBitcoinDataReturn => {
  const [historicalPrices, setHistoricalPrices] = useState<ProcessedPricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<BitcoinBaseError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [prices, latestPrice] = await Promise.all([
        BitcoinService.fetchHistoricalPrices(),
        BitcoinService.getCurrentPrice()
      ]);
      
      setHistoricalPrices(prices);
      setCurrentPrice(latestPrice);
    } catch (err) {
      const errorToSet = err instanceof BitcoinBaseError 
        ? err 
        : new BitcoinBaseError('An unexpected error occurred');
      setError(errorToSet);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();

    if (updateInterval > 0) {
      const intervalId = setInterval(fetchData, updateInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, updateInterval]);

  return {
    historicalPrices,
    currentPrice,
    loading,
    error,
    refetch
  };
};