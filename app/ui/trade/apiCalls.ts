/*"use server";

import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';
import {WebSocket} from 'ws';

export interface OrderBookData {
    bids: [string, string][];
    asks: [string, string][];
}

export async function getOrderBook(symbol: string = 'btc'): Promise<OrderBookData> {
    noStore();
    try {
        const response = await axios.get<OrderBookData>('https://api.binance.com/api/v3/depth', {
            params: {
                symbol: symbol.toUpperCase() + 'USDT',
                limit: 5,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order book:', error);
        throw error;
    }
}



export type Symbol = 'btc' | 'eth';

export async function connectToWebSocket (symbol: Symbol = 'btc', updatePrice: (price: string) => void) {
    const ws = new WebSocket('wss://ws-api.binance.com:443/ws-api/v3');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    ws.on('open', () => {
        const subscription = `${symbol.toLowerCase()}usdt@trade`; // Example: BTCUSDT@trade or ETHUSDT@trade
        const subscriptionPayload = JSON.stringify({
            method: 'SUBSCRIBE',
            params: [subscription],
            id: 1,
        });

        ws.send(subscriptionPayload);
    });

    ws.on('message', (data: string) => {
        const parsedData = JSON.parse(data);
        const { s, p } = parsedData; // symbol (s) and price (p) fields in the response

        if (s && p && s.toLowerCase() === symbol) {
            // Assuming React is used, you can update the state or trigger a callback to display the price
            console.log(`Current price of ${symbol.toUpperCase()}: ${p}`);
            updatePrice(p);
            // Update state or trigger a callback function to display the price in your React component
        }
    });

    ws.on('error', (error: Error) => {
        console.error('WebSocket error:', error)
        // Handle errors, such as re-establishing the connection
    });
};*/