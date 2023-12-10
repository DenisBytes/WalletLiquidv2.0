import FuturesForm from "../../ui/trade/FuturesForm"
import TradingViewWidget from "../../ui/trade/TradingViewWidget"
import FuturesOrderBook from "../../ui/trade/FuturesOrderBook"
import BTCETHButtons from "./BTCETHButtons";
import { getUser } from "@/app/lib/data";
import { auth } from "@/auth";
import { User } from "@/app/lib/definitions";

export default async function FuturesPage() {
    let user: User | undefined;
    const session = await auth();
    user = await getUser(session.user.email);

    return (
        <div className="md:block hidden px-1">
            <BTCETHButtons />
            <div className="flex p-1 m-3 justify-between" style={{width:"98%"}}>
                <TradingViewWidget />
                <FuturesOrderBook/>
                <FuturesForm user={user}/>
            </div>
        </div>
    )
}