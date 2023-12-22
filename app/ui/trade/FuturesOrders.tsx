"use client"
import {useState} from "react";
import type {FuturesOrder} from "../../lib/definitions";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function FuturesOrders({futuresOrders, markPrice, otherMarkPrice}: {futuresOrders: FuturesOrder[] | undefined, markPrice: number, otherMarkPrice: number}) {
    const [activeTab, setActiveTab] = useState('open');
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length - 3);

    const renderOpenOrders = () => {
        const openOrders = futuresOrders?.filter(futuresOrder => futuresOrder.status === 'OPEN');
        if (!openOrders || openOrders.length === 0) {
            return <tr><td colSpan={9}>No open orders available.</td></tr>;
        }

        return (
            
            openOrders.map((futuresOrder) => (
            
            <tr key={futuresOrder.id} className="align-middle items-end">
                <td className={clsx(futuresOrder.side === "LONG" ? "text-green-500" : "text-red-500")}>{futuresOrder.symbol} - USDT</td>
                <td className="items-center">{futuresOrder.usdc_size/100 * futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.symbol === symbol ? markPrice.toFixed(2) : otherMarkPrice.toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                {/*<td className="items-center">{futuresOrder.earnings}</td>*/}
                <td className="flex items-baseline">{parseFloat((futuresOrder.usdc_size/100).toString()).toFixed(2)} (<p style={{fontSize: "10px"}}>x</p>{futuresOrder.leverage})</td>
                <td className="items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
        )))
    };

    const renderPendingOrders = () => {
        // Logic to filter and render pending orders
        // Similar structure to renderOpenOrders but for pending orders
        const pendingOrders = futuresOrders?.filter(futuresOrder => futuresOrder.status === 'PENDING');
        if (!pendingOrders || pendingOrders.length === 0) {
            return <tr><td colSpan={9}>No pending orders available.</td></tr>;
        }

        return pendingOrders.map((futuresOrder) => (
            <tr key={futuresOrder.id}>
                <td className="items-center">{futuresOrder.symbol} - USDT</td>
                <td className="items-center">{futuresOrder.usdc_size * futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.symbol === symbol ? markPrice.toFixed(2) : otherMarkPrice.toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                <td className="items-center">{Number(futuresOrder.usdc_size)}</td>
                {/*<td className="items-center">{futuresOrder.earnings}</td>*/}
                <td className="items-center">{Number(futuresOrder.take_profit)}</td>
                <td className="items-center">{Number(futuresOrder.stop_loss)}</td>
                <td className="flex items-baseline">{parseFloat((futuresOrder.usdc_size/100).toString()).toFixed(2)} <p style={{fontSize: "10px"}}>x</p>({futuresOrder.leverage})</td>
                <td className="items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
        ))
    };

    const renderClosedOrders = () => {
        // Logic to filter and render closed orders
        // Similar structure to renderOpenOrders but for closed orders
        const closedOrders = futuresOrders?.filter(futuresOrder => futuresOrder.status === 'CLOSED');
        if (!closedOrders || closedOrders.length === 0) {
            return <tr><td colSpan={9}>No closed orders available.</td></tr>;
        }

        return closedOrders.map((futuresOrder) => (
            <tr key={futuresOrder.id}>
                <td className="items-center">{futuresOrder.symbol} - USDT</td>
                <td className="items-center">{futuresOrder.usdc_size * futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.symbol === symbol ? markPrice.toFixed(2) : otherMarkPrice.toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                <td className="items-center">{Number(futuresOrder.usdc_size)}</td>
                {/*<td className="items-center">{futuresOrder.earnings}</td>*/}
                <td className="flex items-baseline">{parseFloat((futuresOrder.usdc_size/100).toString()).toFixed(2)} (<p style={{fontSize: "10px"}}>x</p>{futuresOrder.leverage})</td>
                <td className="items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
        ))
    };

    let ordersToRender;
    if (activeTab === 'open') {
        ordersToRender = renderOpenOrders();
    } else if (activeTab === 'pending') {
        ordersToRender = renderPendingOrders();
    } else if (activeTab === 'closed') {
        ordersToRender = renderClosedOrders();
    }


    return (
        <div className="flex w-full justify-center mb-8">
            <footer className="p-3" >
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('open')}
                        className="px-4 py-2 rounded order-button"
                        style={activeTab === 'open' ? {backgroundColor: 'var(--primary-color)', color: "var(--text-color-buttons)", border: "1px solid var(--primary-color)"} : {backgroundColor: "var(--components-background)", color: "var(--home-links)", border: "1px solid var(--primary-color)"}}
                    >
                        OPEN
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className="px-4 py-2 rounded order-button" 
                        style={activeTab === 'pending' ? {backgroundColor: 'var(--primary-color)', color: "var(--text-color-buttons)", border: "1px solid var(--primary-color)"} : {backgroundColor: "var(--components-background)", color: "var(--home-links)", border: "1px solid var(--primary-color)"}}
                    >
                        PENDING
                    </button>
                    <button
                        onClick={() => setActiveTab('closed')}
                        className="px-4 py-2 rounded order-button" 
                        style={activeTab === 'closed' ? {backgroundColor: 'var(--primary-color)', color: "var(--text-color-buttons)", border: "1px solid var(--primary-color)"} : {backgroundColor: "var(--components-background)", color: "var(--home-links)", border: "1px solid var(--primary-color)"}}
                    >
                        CLOSED
                    </button>
                </div>
                <table className="w-full my-4">
                    <thead>
                        <tr className="align-middle items-center">
                            <th>PAIR</th>
                            <th>VALUE</th>
                            <th>ENTRY PRICE</th>
                            <th>CURRENT PRICE</th>
                            <th>LIQUIDATION PRICE</th>
                            <th>EARNINGS</th>
                            <th>MARGIN</th>
                            <th>TP/SL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersToRender}
                    </tbody>
                </table>
            </footer>
        </div>
    
    )
}