import { Trade } from "../types/store";

interface PnLResult {
  totalPnL: number;
  totalBtcHolding: number;
  totalCost: number;
  realizedPnL: number;
  unrealizedPnL: number;
}

export const calculatePnL = (trades: Trade[], currentPrice: number): PnLResult => {
  let totalBtcHolding = 0;
  let totalCost = 0;
  let realizedPnL = 0;

  trades.forEach(trade => {
    if (trade.type === 'Buy') {
      totalBtcHolding += Math.abs(trade.btcAmount);
      totalCost += Math.abs(trade.eurValue);
    } else {
      totalBtcHolding -= Math.abs(trade.btcAmount);
      realizedPnL += trade.eurValue;
    }
  });

  const unrealizedPnL = totalBtcHolding > 0 
    ? (totalBtcHolding * currentPrice) - totalCost 
    : 0;

  const totalPnL = realizedPnL + unrealizedPnL;

  return {
    totalPnL,
    totalBtcHolding,
    totalCost,
    realizedPnL,
    unrealizedPnL
  };
};