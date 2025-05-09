
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
      currency = '₦',
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
  
  export const transformTasks = (backendData: any[], userId: string) => {
    return backendData.map((task) => {
      
      const isCompleted = task.completedBy.includes(userId);
  
      return {
        id: task._id, // Use the unique ID from the backend
        date: task.createdAt.split('T')[0], // Extract the date part (YYYY-MM-DD)
        title: task.description, // Use the title from the backend
        completed: isCompleted, // Determine if the task is completed
        reward: `${task.reward} points`, // Format the reward as a string
        platform:task.platform,
        displayname:task?.displayname||'',
        url:task.url
      };
    });
  };