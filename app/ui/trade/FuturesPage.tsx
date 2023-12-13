"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BTCETHButtons from "./BTCETHButtons";
import FuturesOrderBook from "./FuturesOrderBook";
import FuturesForm from "./FuturesForm";
import TradingViewWidget from "./TradingViewWidget";
import type { User, FuturesOrder } from "@/app/lib/definitions";

export default function FuturesPage({user, futuresOrders}: {user:User  | undefined, futuresOrders:FuturesOrder[] | undefined;}) {
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length - 3);
    const [markPrice, setMarkPrice] = useState(0);
    const [indexPrice, setIndexPrice] = useState(0);
    const [fundingRate, setFundingRate] = useState(0);
    const [nextFundingRate, setNextFundingRate] = useState(0);
    const [openInterest, setOpenInterest] = useState(0);

    useEffect(() => {
        let websocket: WebSocket | null = null;

        const handleWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if(data){
                setMarkPrice(data.p);
                setIndexPrice(data.i);
                setFundingRate(data.r);
                setNextFundingRate(data.T);
            }
        }
        const websocketUrl = `wss://fstream.binance.com/ws/${symbol.toLocaleLowerCase()}usdt@markPrice`;
        websocket = new WebSocket(websocketUrl);

        websocket.addEventListener('open', () => {
            console.log('TickerInfo WebSocket connected');
        });
        websocket.addEventListener("message", handleWebSocketMessage);

        const fetchOpenInterest = async () => {
            try {
                const response = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol.toLocaleUpperCase()}usdt`);
                if (response.ok) {
                    const openInterestData = await response.json();
                    console.log("Open Interest: ", openInterestData.openInterest);
                    setOpenInterest(openInterestData.openInterest);
                } else {
                    console.error('Failed to fetch open interest');
                }
            } catch (error) {
                console.error('Error fetching open interest:', error);
            }
        };

        const intervalId = setInterval(fetchOpenInterest, 5000);
    }, [symbol, openInterest]);

    return (
        <div className="md:block hidden px-1">
            <div className="w-100 flex">
                <BTCETHButtons />
                <div className="flex">
                    <div className="items-center">
                        <p style={{fontSize: "16px"}}>MARK PRICE:</p>
                        <p style={{fontSize: "16px"}}>{markPrice}</p>
                    </div>
                    <div className="items-center">
                        <p style={{fontSize: "16px"}}>INDEX PRICE:</p>
                        <p style={{fontSize: "16px"}}>{indexPrice}</p>
                    </div>
                    <div className="items-center">
                        <p style={{fontSize: "16px"}}>FUNDING RATE:</p>
                        <p style={{fontSize: "16px"}}>{fundingRate}</p>
                    </div>
                    <div className="items-center">
                        <p style={{fontSize: "16px"}}>NEXT FUNDING RATE:</p>
                        <p style={{fontSize: "16px"}}>{nextFundingRate}</p>
                    </div>
                    <div className="items-center">
                        <p style={{fontSize: "16px"}}>OPEN INTEREST:</p>
                        <p style={{fontSize: "16px"}}>{openInterest}</p>
                    </div>
                </div>
            </div>
            <div className="flex p-1 mx-10 my-5 justify-between" style={{width:"95%"}}>
                <TradingViewWidget />
                <FuturesOrderBook/>
                <FuturesForm user={user} price={markPrice} />
            </div>
            <div className="mt-60">
                <h1>Futures order</h1>
            </div>
        </div>
    )
}
