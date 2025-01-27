import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { addTrade, setTradesError, setTradesLoading } from './tradesSlice';
import { Trade } from '../../types/store';
import { updateBalance, updatePnL } from './portfolioSlice';

const mockPortfolioData = {
    balance: {
        btc: 0.12345678,
        fiat: 224.01
    },
    pnl: 12.3,
    transactions: [
        {
            id: '1',
            type: 'Buy',
            amount: 0.0031,
            price: 50.23,
            timestamp: '12:58:58'
        },
        {
            id: '2',
            type: 'Sell',
            amount: 0.00221,
            price: 50,
            timestamp: '11:23:58'
        }
    ],
    priceData: {
        currentPrice: 69820.12,
        historicalPrices: [
            { timestamp: Date.now() - 3600000 * 6, price: 68700 },
            { timestamp: Date.now() - 3600000 * 5, price: 68900 },
            { timestamp: Date.now() - 3600000 * 4, price: 69050 },
            { timestamp: Date.now() - 3600000 * 3, price: 68800 },
            { timestamp: Date.now() - 3600000 * 2, price: 69100 },
            { timestamp: Date.now() - 3600000, price: 68900 }
        ]
    }
};

export const executeTrade = createAsyncThunk<
    void,
    { type: 'Buy' | 'Sell'; amount: number; price: number },
    { dispatch: AppDispatch }
>('trades/executeTrade', async (tradeDetails, { dispatch }) => {
    try {
        dispatch(setTradesLoading(true));

        // Create trade object
        const trade: Trade = {
            id: Date.now().toString(),
            ...tradeDetails,
            timestamp: new Date().toISOString(),
        };

        // Here you would typically send the trade to your API
        // await sendTradeToAPI(trade);

        dispatch(addTrade(trade));

        dispatch(updateBalance(mockPortfolioData.balance));
        dispatch(updatePnL(mockPortfolioData.pnl));

    } catch (error) {
        dispatch(setTradesError(error instanceof Error ? error.message : 'Failed to execute trade'));
    } finally {
        dispatch(setTradesLoading(false));
    }
});