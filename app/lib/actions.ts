import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


// TO update below

const fetchAveragePrice = async (symbol) => {
    try {
      const response = await fetch(`https://data-api.binance.vision/api/v3/avgPrice?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching average price:', error.message);
      return null;
    }
  };
  
  const getAveragePriceEvery3Sec = (symbol) => {
    setInterval(async () => {
      const result = await fetchAveragePrice(symbol);
      if (result) {
        console.log('Current Average Price:', result);
        // Do something with the result here
      }
    }, 3000); // 3 seconds in milliseconds
  };
  
  // Example usage:
  const symbolToFetch = 'BTCUSDT'; // Replace with the symbol you want to fetch
  getAveragePriceEvery3Sec(symbolToFetch);
  