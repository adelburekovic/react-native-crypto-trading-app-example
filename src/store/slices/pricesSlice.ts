import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PricesState, PriceDataPoint } from '../../types/store';

const initialState: PricesState = {
  currentPrice: 0,
  historicalPrices: [],
  loading: false,
  error: null,
};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updateCurrentPrice: (state, action: PayloadAction<number>) => {
      state.currentPrice = action.payload;
    },
    updateHistoricalPrices: (state, action: PayloadAction<PriceDataPoint[]>) => {
      state.historicalPrices = action.payload;
    },
    setPricesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPricesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
    updateCurrentPrice, 
    updateHistoricalPrices, 
    setPricesLoading, 
    setPricesError 
  } = pricesSlice.actions;
  
export { pricesSlice };