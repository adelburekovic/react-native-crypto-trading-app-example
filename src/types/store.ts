export interface RootState {
    portfolio: PortfolioState;
    trades: TradesState;
    prices: PricesState;
}

export interface PortfolioState {
    balance: {
        btc: number;
        fiat: number;
    };
    pnl: number;
}

export interface Trade {
    id: string;
    type: 'Buy' | 'Sell';
    amount: number;
    price: number;
    timestamp: string;
}

export interface TradesState {
    trades: Trade[];
    loading: boolean;
    error: string | null;
}

export interface PriceDataPoint {
    timestamp: number;
    price: number;
}

export interface PricesState {
    currentPrice: number;
    historicalPrices: PriceDataPoint[];
    loading: boolean;
    error: string | null;
}