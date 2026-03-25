export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  
  export function formatPercentage(value: number, decimals: number = 4): string {
    return `${(value * 100).toFixed(decimals)}%`;
  }
  
  export function formatNumber(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
  
  export function getPaymentDate(startDate: Date, period: number, periodsPerYear: number): string {
    const monthsPerPeriod = 12 / periodsPerYear;
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + period * monthsPerPeriod);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }