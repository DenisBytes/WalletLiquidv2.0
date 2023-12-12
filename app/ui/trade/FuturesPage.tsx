import FuturesForm from "../../ui/trade/FuturesForm"
import TradingViewWidget from "../../ui/trade/TradingViewWidget"
import FuturesOrderBook from "../../ui/trade/FuturesOrderBook"
import BTCETHButtons from "./BTCETHButtons";
import { getUser, getFuturesOrders } from "@/app/lib/data";
import { auth } from "@/auth";
import { User, FuturesOrder } from "@/app/lib/definitions";

export default async function FuturesPage() {
    let user: User | undefined;
    const session = await auth();
    let futuresOrders: FuturesOrder[] | undefined;
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
        futuresOrders = await getFuturesOrders(user?.id);
    }

    return (
        <div className="md:block hidden px-1">
            <BTCETHButtons />
            <div className="flex p-1 mx-10 my-5 justify-between" style={{width:"95%"}}>
                <TradingViewWidget />
                <FuturesOrderBook/>
                <FuturesForm user={user}/>
            </div>
            <p>
                {futuresOrders?.map((order) => (
                    <div key={order.id}>
                        <p>ID:  {order.id}</p>
                        <p>Symbol:  {order.symbol}</p>
                        <p>Type:  {order.type}</p>
                        <p>Status:  {order.status}</p>
                        <p>Side:  {order.side}</p>
                        <p>Price:  {order.price}</p>
                        <p>Leverage:  {order.leverage}</p>
                        <p>Amount:  {order.usdcSize}</p>
                        <p>Liquidation Price:  {order.liquidation_price}</p>
                        <p>Created At:  {order.time.toISOString()}</p>
                    </div>
                ))}
            </p>

        </div>
    )
}