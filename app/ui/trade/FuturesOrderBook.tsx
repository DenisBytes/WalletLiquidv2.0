"use client"
import  { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FuturesOrderBook() {
    const [bids, setBids] = useState<{ price: string; quantity: string }[]>([]);
    const [asks, setAsks] = useState<{ price: string; quantity: string }[]>([]);
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length -3);

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

        const isLgScreen = window.matchMedia('(min-width: 1024px)').matches;

        if (isLgScreen) {
            const websocketUrl = `wss://stream.binance.com:9443/ws/${symbol.toLocaleLowerCase()}usdt@depth`;
            websocket = new WebSocket(websocketUrl);

            websocket.addEventListener('open', () => {
                console.log('OrderBook WebSocket connected');
            
            });

            websocket.addEventListener('message', handleWebSocketMessage);
        }

        if (!isLgScreen && websocket){
            websocket.close();
            console.log('OrderBook WebSocket closed');
        }

    
        return () => {
            if (websocket) {
                websocket.close();
                console.log('OrderBook WebSocket closed');
            }
        };
    }, [symbol]);

    if (!symbol) {
        return <div className='lg:block hidden'>Complete form before</div>;
    }


    return (
        <div className='lg:flex w-1/6 flex-col justify-center items-center orderbook-div h-full hidden'>
            <h2>ORDER BOOK</h2>
            <div className='w-10/12 flex flex-col justify-between'>
                <table>
                    <thead>
                        <tr style={{fontSize: "10px", fontWeight: 400}}> 
                            <th className='items-start'>PRICE</th>
                            <th className='items-end'>QUANTITY ({symbol})</th>
                        </tr>
                    </thead>
                    <tbody className='items-start'>
                        {asks.slice(0,5).reverse().map((ask) => (
                            <tr key={`ask-${ask}`} className='text-red-500'>
                                <td className='items-start'>{parseFloat(ask.price).toFixed(2)}</td>
                                <td className='items-end'>{parseFloat(ask.quantity).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-10/12 flex flex-col justify-between'>
                <table>
                    <thead>
                        <tr style={{fontSize: "10px", fontWeight: 400}}>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.slice(0, 5).map((bid) => (
                            <tr key={`bid-${bid}`} className='text-green-500'>
                                <td className='items-start'>{parseFloat(bid.price).toFixed(2)}</td>
                                <td className='items-end'>{parseFloat(bid.quantity).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

