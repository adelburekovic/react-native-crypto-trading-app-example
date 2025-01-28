interface TradeDetails {
    type: 'Buy' | 'Sell';
    amount: number;
    price: number;
  }
  
  interface TradeAmounts {
    eurValue: number;
    btcAmount: number;
  }
  
  export const calculateTradeAmounts = (
    tradeDetails: TradeDetails
  ): TradeAmounts => {
    if (tradeDetails.type === 'Buy') {
      return {
        eurValue: -tradeDetails.amount,
        btcAmount: Math.abs(tradeDetails.amount / tradeDetails.price)
      };
    }
    
    return {
      btcAmount: -tradeDetails.amount,
      eurValue: Math.abs(tradeDetails.amount * tradeDetails.price)
    };
  };