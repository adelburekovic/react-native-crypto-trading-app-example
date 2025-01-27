import { useState, useEffect, useCallback } from 'react';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { BitcoinError, BitcoinService } from '../services/BitcoinService';

interface UseBitcoinDataReturn {
    chartData: LineChartData | null;
    currentPrice: number;
    formattedPrice: string;
    loading: boolean;
    error: BitcoinError | null;
    refetch: () => Promise<void>;
}

export const useBitcoinData = (
    updateInterval = 60000
): UseBitcoinDataReturn => {
    const [chartData, setChartData] = useState<LineChartData | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<BitcoinError | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const [historicalData, price] = await Promise.all([
                BitcoinService.fetchHistoricalPrices(),
                BitcoinService.getCurrentPrice()
            ]);

            setChartData(historicalData);
            setCurrentPrice(price);
        } catch (err) {
            setError(err instanceof BitcoinError ? err : new BitcoinError(
                'An unexpected error occurred',
                'UNKNOWN_ERROR'
            ));
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
        chartData,
        currentPrice,
        formattedPrice: BitcoinService.formatPrice(currentPrice),
        loading,
        error,
        refetch
    };
};