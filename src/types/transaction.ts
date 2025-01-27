export interface Transaction {
    type: 'Buy' | 'Sell';
    amount: string;
    price: string;
    timestamp: string;
}