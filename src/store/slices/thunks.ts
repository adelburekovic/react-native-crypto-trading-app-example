import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { addTrade, setTradesError, setTradesLoading } from './tradesSlice';
import { Trade } from '../../types/store';
import { updateBalance, updatePnL } from './portfolioSlice';
import { calculateTradeAmounts } from '../../utils/tradeCalculator';
import { calculatePnL } from '../../utils/pnlCalculator';

export const executeTrade = createAsyncThunk(
  'trades/executeTrade',
  async (
    tradeDetails: { type: 'Buy' | 'Sell'; amount: number; price: number },
    { dispatch, getState }
  ) => {
    try {
      dispatch(setTradesLoading(true));
      
      const state = getState() as RootState;
      const currentBalance = state.portfolio.balance;
      const currentPrice = state.prices.currentPrice;

      const { btcAmount, eurValue } = calculateTradeAmounts(tradeDetails);
      
      const trade: Trade = {
        id: Date.now().toString(),
        type: tradeDetails.type,
        btcAmount: parseFloat(btcAmount.toFixed(4)),
        eurValue,
        price: tradeDetails.price,
        timestamp: new Date().toISOString(),
      };

      const newBalance = {
        btc: currentBalance.btc + btcAmount,
        fiat: currentBalance.fiat + eurValue
      };

      const allTrades = [...state.trades.trades, trade];
      const pnlResult = calculatePnL(allTrades, currentPrice);

      dispatch(addTrade(trade));
      dispatch(updateBalance(newBalance));
      dispatch(updatePnL(pnlResult.totalPnL));
    } catch (error) {
      dispatch(setTradesError(error instanceof Error ? error.message : 'Failed to execute trade'));
    } finally {
      dispatch(setTradesLoading(false));
    }
  }
);