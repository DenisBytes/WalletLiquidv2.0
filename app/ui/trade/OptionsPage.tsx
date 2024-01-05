"use client";
import type { User } from "@/app/lib/definitions";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function OptionsPage({user}: {user: User | undefined}) {
    const [symbol, setSymbol] = useState("BTC");
    const [callOrPut, setCallOrPut] = useState("c");
    const [side, setSide] = useState("buy");
    const [strikePrice, setStrikePrice] = useState(46000);
    const [expiration, setExpiration] = useState("240126");
    const [optionSize, setOptionSize] = useState(0.1);
    const [impliedVolatility, setImpliedVolatility] = useState(0);
    const [optionPrice, setOptionPrice] = useState(0);
    const [delta, setDelta] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        let websocket: WebSocket | null = null;
        const handleWebSocketMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if(data){
                side === "buy" ? setTotalPrice(data.ao * optionSize) : setTotalPrice(data.bo * optionSize);
                side === "buy" ? setImpliedVolatility(data.a) : setImpliedVolatility(data.b);
                side === "buy" ? setOptionPrice(data.ao) : setOptionPrice(data.bo);
                setDelta(data.d);
            }
        }
        const tickerInfo = `${symbol}-${expiration}-${strikePrice.toString()}-${callOrPut.toUpperCase()}`;
        const websocketUrl = `wss://nbstream.binance.com/eoptions/ws/${tickerInfo}@ticker`;
        websocket = new WebSocket(websocketUrl);

        websocket.addEventListener('open', () => {
            console.log('WebSocket Options connection established');
        });
        websocket.addEventListener("message", handleWebSocketMessage);


        return () => {
            if (websocket) {
                websocket.close();
                console.log('WebSocket Options connection closed');
            }
        }
    }, [symbol, expiration, strikePrice, callOrPut, optionSize, side]);
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
                            <label htmlFor="call" className="option-type-label rounded-lg py-4 px-[3.25rem] mr-1" onClick={() => setCallOrPut("c")} style={{background: callOrPut === "c" ? "linear-gradient(90deg, var( --color-div-background-first) 0%, var(--color-div-background-second) 100%)" : "var(--components-background)"}}>
                                CALL
                            </label>
                            <input id="put" className="option-type-input" style={{ fontSize: "10px" }} type="radio" name="type" value={"PUT"} />
                            <label htmlFor="put" className="option-type-label rounded-lg py-4 px-[3.25rem] ml-1" onClick={() => setCallOrPut("p")} style={{background: callOrPut === "p" ? "linear-gradient(90deg, var( --color-div2-background-first) 0%, var(--color-div2-background-second) 100%)": "var(--components-background)"}}>
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
                    <div className="w-full flex justify-between">
                        <div className="w-1/3 min-h-[20vh] border border-[var(--primary-color)] my-4 mr-2 p-4 option-form-div rounded-md bg-[var(--components-background)]">
                            <label htmlFor="strike-price" className="p-2" style={{fontSize: "14px"}}>STRIKE PRICE</label>
                            <select id="strike-price" name="strike_price" className="type-select w-full rounded-xl mb-4" defaultValue={46000} onChange={(e) => setStrikePrice(Number(e.target.value))}>
                                <option value={40000}>40000</option>
                                <option value={41000}>41000</option>
                                <option value={42000}>42000</option>
                                <option value={46000}>46000</option>
                                <option value={50000}>50000</option>
                            </select>
                            <label htmlFor="expiration" className="p-2" style={{fontSize: "14px"}}>EXPIRATION</label>
                            <select id="expiration" name="expiration" className="type-select w-full rounded-xl mb-4" onChange={(e) => setExpiration(e.target.value)}>
                                <option value={"240126"}>26 Jan 2024</option>
                                <option value={"240223"}>23 Feb 2024</option>
                            </select>
                            <label htmlFor="optin-size" className="p-2" style={{fontSize: "14px"}}>OPTION SIZE</label>
                            <input id="optin-size" type="number" name="option_size" className="futures-input w-full rounded-xl mb-4" onChange={(e) => setOptionSize(Number(e.target.value))} defaultValue={0.1} step={0.1} />
                            <SubmitButton />
                        </div>
                        <div className="w-2/3 border border-[var(--primary-color)] my-4 ml-2 p-4 option-form-div rounded-md bg-[var(--components-background)]">
                            {totalPrice !== 0 ? <table className="w-full my-6">
                                <thead>
                                    <tr className="text-center border-b border-b-[var(--primary-color)]">
                                        <th className="px-2" style={{fontSize: "12px"}}>UNDERLYING</th>
                                        <th className="px-2" style={{fontSize: "12px"}}>TOTAL</th>
                                        <th className="px-2" style={{fontSize: "12px"}}>BREAKEVEN</th>
                                        <th className="px-2" style={{fontSize: "12px"}}>IV</th>
                                        <th className="px-2" style={{fontSize: "12px"}}>DELTA</th>
                                        <th className="px-2" style={{fontSize: "12px"}}>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-4">{symbol}-USD</td>
                                        <td className="px-2 py-4">{totalPrice}</td>
                                        <td className="px-2 py-4">{"BREAKEVEN"}</td>
                                        <td className="px-2 py-4">{(impliedVolatility*100).toFixed(2)}%</td>
                                        <td className="px-2 py-4">{(delta*1).toFixed(5)}</td>
                                        <td className="px-2 py-4">{optionPrice}</td>
                                    </tr>
                                </tbody>
                            </table> 
                            : <div className="w-full flex justify-center mt-12">
                                <div className="home-logo"></div>
                            </div>}
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <div className="p-2 flex justify-center">
            <button type="submit" className="futures-submit" >
                {pending ? "Submitting..." : "Submit"}
            </button>
        </div>
    )
}