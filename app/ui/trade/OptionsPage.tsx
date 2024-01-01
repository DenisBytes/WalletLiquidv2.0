"use client";
import type { User } from "@/app/lib/definitions";
import { useState, useEffect } from "react";

export default function OptionsPage({user}: {user: User | undefined}) {
    const [data, setData] = useState({});
    const [symbol, setSymbol] = useState("BTC");
    const [callOrPut, setCallOrPut] = useState("call");
    const [side, setSide] = useState("buy");
    /*useEffect(() => {
        let websocket: WebSocket | null = null;
        const handleWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if(data){
                setData(data);
            }
        }
        const websocketUrl = `wss://nbstream.binance.com/eoptions/ws/BTC-240101-46000-C@ticker`;
        websocket = new WebSocket(websocketUrl);

        websocket.addEventListener('open', () => {
            console.log('WebSocket Options connection established');
        });
        websocket.addEventListener("message", handleWebSocketMessage);
    }, [symbol]);*/
    return (
        <div className="w-full flex justify-center">
            <div className="w-2/3 p-8 mt-4">
                <form>
                    <div className="flex items-center justify-between w-full">
                        <div className="py-4 px-1 rounded-lg" style={{background: "var(--components-background)"}}>
                            <input id="btc" className="option-symbol-input" style={{ fontSize: "10px" }} type="radio" name="symbol" value={"BTC"} />
                            <label htmlFor="btc" className="option-symbol-label rounded-lg py-4 px-[3.25rem] mr-1" onClick={() => setSymbol("BTC")} style={{background: symbol ==="BTC" ? "linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(248,216,20,1) 100%)" : "var(--components-background)"}}>
                                BTC
                            </label>
                            <input id="eth" className="option-symbol-input" style={{ fontSize: "10px" }} type="radio" name="symbol" value={"ETH"} />
                            <label htmlFor="eth" className="option-symbol-label rounded-lg py-4 px-[3.25rem] ml-1" onClick={() => setSymbol("ETH")} style={{background: symbol ==="ETH" ? "linear-gradient(90deg, rgba(72,168,229,1) 0%, rgba(44,229,154,1) 100%)" : "var(--components-background)"}}>
                                ETH
                            </label>
                        </div>
                        <div className="py-4 px-1 rounded-lg" style={{background: "var(--components-background)"}}>
                            <input id="call" className="option-type-input" style={{ fontSize: "10px" }} type="radio" name="type" value={"CALL"} />
                            <label htmlFor="call" className="option-type-label rounded-lg py-4 px-[3.25rem] mr-1" onClick={() => setCallOrPut("call")} style={{background: callOrPut === "call" ? "linear-gradient(90deg, var( --color-div-background-first) 0%, var(--color-div-background-second) 100%)" : "var(--components-background)"}}>
                                CALL
                            </label>
                            <input id="put" className="option-type-input" style={{ fontSize: "10px" }} type="radio" name="type" value={"PUT"} />
                            <label htmlFor="put" className="option-type-label rounded-lg py-4 px-[3.25rem] ml-1" onClick={() => setCallOrPut("put")} style={{background: callOrPut === "put" ? "linear-gradient(90deg, var( --color-div2-background-first) 0%, var(--color-div2-background-second) 100%)": "var(--components-background)"}}>
                                PUT
                            </label>
                        </div>
                        <div className="py-4 px-1 rounded-lg" style={{background: "var(--components-background)"}}>
                            <input id="buy" className="option-side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"BUY"} />
                            <label htmlFor="buy" className="option-side-label rounded-lg py-4 px-[3.25rem] mr-1" onClick={() => setSide("buy")} style={{background: side === "buy" ? "linear-gradient(90deg, var( --color-div-background-first) 0%, var(--color-div-background-second) 100%)" : "var(--components-background)"}}>
                                BUY
                            </label>
                            <input id="sell" className="option-side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"SELL"} />
                            <label htmlFor="sell" className="option-side-label rounded-lg py-4 px-[3.25rem] ml-1" onClick={()=>{setSide("sell")}} style={{background: side === "sell" ? "linear-gradient(90deg, var( --color-div2-background-first) 0%, var(--color-div2-background-second) 100%)" : "var(--components-background)"}}>
                                SELL
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}