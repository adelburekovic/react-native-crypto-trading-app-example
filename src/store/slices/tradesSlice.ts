import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trade, TradesState } from '../../types/store';

const initialState: TradesState = {
  trades: [],
  loading: false,
  error: null,
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades.unshift(action.payload);
    },
    setTradesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTradesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload;
    },
  },
});

export const { addTrade, setTradesLoading, setTradesError, setTrades } = tradesSlice.actions;

export { tradesSlice };