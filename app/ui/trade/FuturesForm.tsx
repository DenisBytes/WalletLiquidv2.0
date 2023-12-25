"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { createFuturesOrder } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";

export default function FuturesForm({user, price}: {user:any, price:number}) {
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length -3);
    const [typeValue, setTypeValue] = useState("MARKET");
    const [isChecked, setIsChecked] = useState(false);
    const [sideValue, setSideValue] = useState("LONG");

    return (
        <form noValidate className="w-2/5 xl:w-1/4 ml-2 futures-form p-2 h-full" action={createFuturesOrder}>
            <input type="hidden" name="symbol" value={symbol} />
            <input type="hidden" name="user-id" value={user?.id} />
            <div className="flex items-center justify-around mb-6">
                <input id="long" className="side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"LONG"} defaultChecked/>
                <label htmlFor="long" className="side-label py-3 lg:px-10 xl:px-11 md:px-10" onClick={() => setSideValue("LONG")}>
                        LONG
                </label>
                
                <input id="short" className="side-input" style={{ fontSize: "10px" }} type="radio" name="side" value={"SHORT"} />
                <label htmlFor="short" className="side-label py-3 lg:px-10 xl:px-11 md:px-10" onClick={() => setSideValue("SHORT")}>
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
                <input type="number" name="price" defaultValue={price.toFixed(2)} placeholder={price.toFixed(2)} className="futures-input"/>
                <p style={{ fontSize: "12px" }}>CURRENT PRICE: {price.toFixed(2)}</p>
            </div>
            <div className="p-2 flex justify-between w-full">
                <fieldset className="w-3/5">
                    <legend>AMOUNT</legend>
                    <input type="number" name="usdc-size" min="10" max={user?.usdc} step="1" defaultValue={10} placeholder="MIN: 10" className="futures-input"/>
                    <p style={{ fontSize: "12px" }}>(BALANCE: {user?.usdc} USDC)</p>
                </fieldset>
                <fieldset className=" w-1/4">
                    <legend>LEVERAGE</legend>
                    <input type="number" name="leverage" min="1" max="100" step="1" defaultValue={1} placeholder="MAX: 100" className="futures-input" />
                </fieldset>
            </div>
            <div className="flex items-center">
                <input type="checkbox" className="square" checked={isChecked} onChange={()=>setIsChecked(!isChecked)}/>
                <p style={{ fontSize: "10px" }}>Advanced</p>
            </div>
            {isChecked ? (
                <div className="p-2">
                    <div className="p-2">
                        <label>TAKE PROFIT</label>
                        <input type="number" id="take-profit" name="take_profit" defaultValue={0} min={sideValue === "LONG" ? price.toFixed(2) :0} max={sideValue === "SHORT" ? price.toFixed(2) :0} className="futures-input" />
                        <label>STOP LOSS</label>
                        <input type="number" id="stop-loss" name="stop_loss" defaultValue={0} min={sideValue === "SHORT" ? price.toFixed(2) :0} max={sideValue === "LONG" ? price.toFixed(2) :0} className="futures-input" />
                    </div>
                </div>
            ) : null}
            <SubmitButton />
        </form>
    );
}

function SubmitButton(){
    const {pending} = useFormStatus();

    return (
        <div className="p-2 flex justify-center">
            <button type="submit" className="futures-submit">
                {pending ? "Submitting..." : "Submit"}
            </button>
        </div>
    )
}
