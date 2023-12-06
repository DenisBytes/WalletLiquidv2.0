"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FuturesOrderBook({ symbol }: { symbol?: "btc" | "eth" }) {
    const [bids, setBids] = useState<{ price: string; quantity: string }[]>([]);
    const [asks, setAsks] = useState<{ price: string; quantity: string }[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        let websocket: WebSocket | null = null;

        const handleWebSocketMessage = (event: MessageEvent) => {   
            const data = JSON.parse(event.data);

            if (data && data.e === 'depthUpdate' && data.s === `${symbol?.toUpperCase()}USDT`) {
                const updatedBids = data.b.map((bid: string[]) => ({
                    price: bid[0],
                    quantity: bid[1],
                }));

                const updatedAsks = data.a.map((ask: string[]) => ({
                    price: ask[0],
                    quantity: ask[1],
                }));

                setBids(updatedBids);
                setAsks(updatedAsks);
            }
        };

        const isLgScreen = window.innerWidth >= 1024;

        if (symbol && pathname === "/home/trade/futures" && isLgScreen) {
            const websocketUrl = `wss://stream.binance.com:9443/ws/${symbol}usdt@depth`;
            websocket = new WebSocket(websocketUrl);

            websocket.addEventListener('open', () => {
                console.log('WebSocket connected');
            });

            websocket.addEventListener('message', handleWebSocketMessage);
        }

    
        return () => {
            if (websocket) {
                websocket.close();
                console.log('WebSocket closed');
            }
        };
    }, [symbol, pathname]);

    if (!symbol) {
        return <div className='lg:block hidden'>Complete form before</div>;
    }


    return (
        <div className='lg:block hidden w-1/4'>
            <h2>Order Book</h2>
            <p>{symbol} price: </p>
            <div>
                <h3>Bids</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.slice(0, 5).map((bid, index) => (
                            <tr key={`bid-${index}`}>
                            <td>{parseFloat(bid.price).toFixed(2)}</td>
                            <td>{parseFloat(bid.quantity).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Asks</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asks.slice(0,5).reverse().map((ask, index) => (
                            <tr key={`ask-${index}`}>
                            <td>{parseFloat(ask.price).toFixed(2)}</td>
                            <td>{parseFloat(ask.quantity).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

