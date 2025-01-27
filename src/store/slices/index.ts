import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { tradesSlice } from './tradesSlice';
import { portfolioSlice } from './portfolioSlice';
import { pricesSlice } from './pricesSlice';
import { RootState } from '../../types/store';

export const store = configureStore({
    reducer: {
        portfolio: portfolioSlice.reducer,
        trades: tradesSlice.reducer,
        prices: pricesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
            immutableCheck: true,
        }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectPortfolio = (state: RootState) => state.portfolio;
export const selectTrades = (state: RootState) => state.trades;
export const selectPrices = (state: RootState) => state.prices;

export const selectCurrentPrice = (state: RootState) => state.prices.currentPrice;
export const selectPnL = (state: RootState) => state.portfolio.pnl;
export const selectBalance = (state: RootState) => state.portfolio.balance;
export const selectLatestTrades = (state: RootState) => state.trades.trades.slice(0, 10);