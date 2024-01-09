"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BTCETHButtons from "./BTCETHButtons";
import FuturesOrderBook from "./FuturesOrderBook";
import FuturesForm from "./FuturesForm";
import TradingViewWidget from "./TradingViewWidget";
import type { User, FuturesOrder } from "@/app/lib/definitions";
import FuturesTickerInfo from "./FuturesTickerInfo";
import Link from "next/link";
import FuturesOrders from "./FuturesOrders";

export default function FuturesPage({user, futuresOrders}: {user:User  | undefined, futuresOrders:FuturesOrder[] | undefined;}) {
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length - 3);
    const [markPrice, setMarkPrice] = useState(0);
    const [indexPrice, setIndexPrice] = useState(0);
    const [fundingRate, setFundingRate] = useState(0);
    const [openInterest, setOpenInterest] = useState(0);
    const [otherMarkPrice, setOtherMarkPrice] = useState(0);

    useEffect(() => {
        let websocket: WebSocket | null = null;
        let otherWebsocket: WebSocket | null = null; 

        const handleWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if(data){
                setMarkPrice(parseFloat(data.p));
                setIndexPrice(parseFloat(data.i));
                setFundingRate(data.r*100);
            }
        }
        const websocketUrl = `wss://fstream.binance.com/ws/${symbol.toLocaleLowerCase()}usdt@markPrice`;
        websocket = new WebSocket(websocketUrl);

        websocket.addEventListener('open', () => {
        });
        websocket.addEventListener("message", handleWebSocketMessage);

        const handleOtherWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if(data){
                setOtherMarkPrice(parseFloat(data.p));
            }
        }

        const otherSymbol = symbol === "BTC" ? "ETH" : "BTC";
        const otherWebsocketUrl = `wss://fstream.binance.com/ws/${otherSymbol.toLocaleLowerCase()}usdt@markPrice`;
        otherWebsocket = new WebSocket(otherWebsocketUrl);
        otherWebsocket.addEventListener('open', () => {
        });
        otherWebsocket.addEventListener("message", handleOtherWebSocketMessage);

        const fetchOpenInterest = async () => {
            try {
                const response = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol.toLocaleUpperCase()}usdt`);
                if (response.ok) {
                    const openInterestData = await response.json();
                    setOpenInterest(parseFloat(openInterestData.openInterest));
                } else {
                    console.error('Failed to fetch open interest');
                }
            } catch (error) {
                console.error('Error fetching open interest:', error);
            }
        };

        const intervalId = setInterval(fetchOpenInterest, 5000);
        //no return statement (closing web sockets) because it closes immmeditely after render. don't know why
    }, [symbol, openInterest]);

    return (
        <div className="md:block hidden px-1">
            <div className="w-100 flex px-5 items-center justify-between mx-4">
                <div className="flex p-5 items-center w-[100%]">
                    <BTCETHButtons />
                    <FuturesTickerInfo markPrice={markPrice} indexPrice={indexPrice} fundingRate={fundingRate} openInterest={openInterest} />
                </div>
                <Link href="/trade/options" className=" border border-[var(--primary-color)] px-4 py-4 rounded-lg text-[var(--home-links)] bg-[var(--components-background)] hover:text-[var(--text-color-buttons)] hover:bg-[var(--primary-color)]">OPTIONS</Link>
            </div>
            <div className="flex p-1 mx-10 my-5 justify-between min-h-[75vh]" style={{width:"95%"}}>
                <TradingViewWidget />
                <FuturesOrderBook/>
                <FuturesForm user={user} price={markPrice} />
            </div>
            <FuturesOrders futuresOrders={futuresOrders} markPrice={markPrice} otherMarkPrice={otherMarkPrice}/>
        </div>
    )
}
