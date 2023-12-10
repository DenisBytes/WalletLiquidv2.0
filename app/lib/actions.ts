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

export async function fetchAveragePrice (symbol: string) {
    try {
        const response = await fetch(`https://data-api.binance.vision/api/v3/avgPrice?symbol=${symbol}USDT`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data.price;
    } catch (error: any) {
        console.error('Error fetching average price:', error.message);
        return null;
    }
};
