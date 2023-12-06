import FuturesForm from "../../ui/trade/FuturesForm"
import TradingViewWidget from "../../ui/trade/TradingViewWidget"
import FuturesOrderBook from "../../ui/trade/FuturesOrderBook"
import BTCETHButtons from "./BTCETHButtons";

export default function FuturesPage() {
    return (
        <div className="md:block hidden px-1">
            <BTCETHButtons /> 
            <div className="flex p-1 m-1 justify-between" style={{width:"98%"}}>
                <TradingViewWidget />
                <FuturesOrderBook />
                <FuturesForm />
            </div>
        </div>
    )
}