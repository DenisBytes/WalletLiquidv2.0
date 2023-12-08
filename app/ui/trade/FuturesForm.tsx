import { useFormState } from "react-dom";
import { getUser } from "@/app/lib/data";
import { auth } from "@/auth";
import { User } from "@/app/lib/definitions";

export default async function FuturesForm() {  

    let user: User | undefined;
    const session = await auth();
    if(!!session || !!session.user){
        user = await getUser(session.user.email);
    }

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
            <div className="p-2">
                <input type="number" name="price" min="10" max="100" step="1" defaultValue={1} className="w-full"/>
            </div>
            <div className="p-2 flex justify-between w-full">
                <fieldset className="w-3/5">
                    <legend>AMOUNT (USDC)</legend>
                    <input type="number" name="usdcSize" min="10" max={user?.usdc} step="1" defaultValue={1} className="w-full"/>
                    <p style={{ fontSize: "12px" }}>(BALANCE: {user?.usdc} USDC)</p>
                </fieldset>
                <fieldset className=" w-1/4">
                    <legend>LEVERAGE</legend>
                    <input type="number" name="leverage" min="1" max="100" step="1" defaultValue={1} className="w-full" />
                </fieldset>
            </div>
            <div>
                <input type="submit" value="Submit" className="w-full"/>
            </div>
        
        </form>
    );
}
