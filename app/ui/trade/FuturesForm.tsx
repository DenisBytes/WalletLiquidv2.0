"use client";
import { useFormState } from "react-dom";
export function FuturesForm() {

    return (
        <form className="lg:w-1/4 w-1/2 futures-form p-2">
            <input type="hidden" name="symbol" value="BTC" />
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
                <select id="type" name="type" className="w-full rounded type-select" defaultValue={"MARKET"}>
                    <option value={"MARKET"}>MARKET</option>
                    <option value={"LIMIT"}>LIMIT</option>
                </select>
            </div>
        
        </form>
    );
}
