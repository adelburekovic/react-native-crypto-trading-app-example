/**
 * Format a number as EUR currency using German locale
 * @param amount - The amount to format
 * @param options - Optional configuration for the formatter
 * @returns Formatted currency string
 */
export const formatEUR = (
    amount: number,
    options: { minimumFractionDigits?: number } = {}
  ): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: options.minimumFractionDigits ?? 2,
    }).format(amount);
  };
  
  /**
   * Format PnL value as EUR currency using German locale
   * @param pnl - The PnL amount to format
   * @returns Formatted PnL string
   */
  export const formatPnL = (pnl: number): string => {
    return formatEUR(pnl, { minimumFractionDigits: 1 });
  };
  
  /**
   * Format BTC price as EUR currency using German locale
   * @param price - The BTC price to format
   * @returns Formatted price string
   */
  export const formatBTCPrice = (price: number): string => {
    return formatEUR(price, { minimumFractionDigits: 2 });
  };