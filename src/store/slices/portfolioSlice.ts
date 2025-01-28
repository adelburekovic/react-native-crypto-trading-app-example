import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState } from '../../types/store';

const initialState: PortfolioState = {
    balance: {
        btc: 0.5,
        fiat: 5000,
    },
    pnl: 0,
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        updateBalance(state, action: PayloadAction<{ btc: number; fiat: number }>) {
            state.balance = action.payload;
        },
        updatePnL(state, action: PayloadAction<number>) {
            state.pnl = action.payload;
        },
    },
});

export const { updateBalance, updatePnL } = portfolioSlice.actions;

export { portfolioSlice };
