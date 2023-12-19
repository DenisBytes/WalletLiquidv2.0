"use client"
import type {FuturesOrder} from "../../lib/definitions";
import clsx from "clsx";

export default function FuturesOrders({futuresOrders, markPrice}: {futuresOrders: FuturesOrder[] | undefined, markPrice: number}) {
    return (
        <footer  className="mt-60 w-full">
            <h1>FuturesOrders</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Size</th>
                        <th>Value</th>
                        <th>Entry Price</th>
                        <th>Current Price</th>
                        <th>Liquidation Price</th>
                        <th>Earnings</th>
                        <th>Margin</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {futuresOrders?.map((futuresOrder) => (
                        <tr key={futuresOrder.id}>
                            <td className={clsx(futuresOrder.side === "LONG" ? "text-green-500" : "text-red-500")}>{futuresOrder.symbol} - USDT</td>
                            <td>{futuresOrder.usdcSize * markPrice}</td>
                            <td>{futuresOrder.value}</td>
                            <td>{futuresOrder.entry_price}</td>
                            <td>{markPrice.toFixed(2)}</td>
                            <td>{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                            <td>{futuresOrder.earnings}</td>
                            <td className="flex items-baseline">{futuresOrder.usdcSize / 100} (<p style={{fontSize: "10px"}}>x</p>{futuresOrder.leverage})</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </footer>
    )
}