
type CurrencyFormatOptions = {
    currency?: string; // ISO 4217 currency code (e.g., 'USD', 'EUR')
    locale?: string;   // BCP 47 language tag (e.g., 'en-US', 'de-DE')
    currencyDisplay?: 'symbol' | 'code' | 'name';
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    fallback?: string; // Display when value is invalid
  };
  
  export const formatCurrency = (
    value: number | null | undefined,
    options: CurrencyFormatOptions = {}
  ): string => {
    const {
      currency = 'USD',
      locale = 'en-US',
      currencyDisplay = 'symbol',
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
      fallback = '00.00'
    } = options;
  
    // Handle invalid values
    if (typeof value !== 'number' || isNaN(value)) {
      return fallback;
    }
  
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay,
        minimumFractionDigits,
        maximumFractionDigits
      }).format(value);
    } catch (error) {
      console.error('Currency formatting error:', error);
      return fallback;
    }
  };
  
