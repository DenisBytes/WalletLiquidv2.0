"use client";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import clsx from "clsx";

export default function FuturesForm({user}: {user:any}) {
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length -3);
    const [price, setPrice] = useState<number>();
    const [typeValue, setTypeValue] = useState("MARKET");
    useEffect(() => {
        let websocket: WebSocket | null = null;

        const handleWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data && data.e === 'avgPrice' && data.s === `${symbol?.toUpperCase()}USDT`) {
                const tempPrice: number = +data.w;
                const twoDecimals: number= Math.round(tempPrice * 100) / 100;
                setPrice(twoDecimals);
            }
        }
        const websocketUrl = `wss://stream.binance.com:9443/ws/${symbol.toLocaleLowerCase()}usdt@avgPrice`;
        websocket = new WebSocket(websocketUrl);

        websocket.addEventListener('open', () => {
            console.log('CurrentPrice WebSocket connected');
        
        });
        websocket.addEventListener("message", handleWebSocketMessage);
    })

    return (
        <form className="lg:w-1/4 w-1/2 futures-form p-2 h-full">
            <input type="hidden" name="symbol" value={symbol} />
            <div className="flex items-center justify-around mb-6">
                <input id="long" className="side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"LONG"} defaultChecked/>
                <label htmlFor="long" className="side-label py-3 lg:px-7 xl:px-11 md:px-14">
                        LONG
                </label>
                
                <input id="short" className="side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"SHORT"} />
                <label htmlFor="short" className="side-label py-3 lg:px-7 xl:px-11 md:px-14">
                        SHORT
                </label>
            </div>
            <div className="flex items-center p-2">
                <select id="type" name="type" className="w-full rounded type-select" defaultValue={"MARKET"} onChange={(e) => setTypeValue(e.target.value)}>
                    <option value={"MARKET"}>MARKET</option>
                    <option value={"LIMIT"}>LIMIT</option>
                </select>
            </div>
            <div className={clsx("p-2", typeValue === "MARKET" ? "hidden" : "")}>
                <label>PRICE</label>
                <input type="number" name="price" className="futures-input"/>
                <p style={{ fontSize: "12px" }}>CURRENT PRICE: {price}</p>
            </div>
            <div className="p-2 flex justify-between w-full">
                <fieldset className="w-3/5">
                    <legend>AMOUNT</legend>
                    <input type="number" name="usdcSize" min="10" max={user?.usdc} step="1" defaultValue={1} className="futures-input"/>
                    <p style={{ fontSize: "12px" }}>(BALANCE: {user?.usdc} USDC)</p>
                </fieldset>
                <fieldset className=" w-1/4">
                    <legend>LEVERAGE</legend>
                    <input type="number" name="leverage" min="1" max="100" step="1" defaultValue={1} className="futures-input" />
                </fieldset>
            </div>
            {
                /*
                <input type="checkbox" className="square"/>
                <div className="p-2">
                    <label>TAKE PROFIT</label>
                    <input type="number" id="take-profit" name="takeProfit" className="futures-input" />
                    <label>STOP LOSS</label>
                    <input type="number" id="stop-loss" name="stopLoss" className="futures-input" />
                </div>
                 */
            }
                
            <div className="p-2 flex justify-center">
                <input type="submit" value="SUBMIT" className="futures-submit"/>
            </div>
        </form>
    );
}
