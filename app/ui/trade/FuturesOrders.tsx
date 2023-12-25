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
            
            <tr key={futuresOrder.id} className="align-middle items-end my-2">
                
                <td className={clsx(futuresOrder.side === "LONG" ? "text-green-500" : "text-red-500")}>{futuresOrder.symbol} - USDT</td>
                <td className="items-center hidden lg:block">{futuresOrder.usdc_size/100 * futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.symbol === symbol ? markPrice.toFixed(2) : otherMarkPrice.toFixed(2)}</td>
                <td className="items-center">{parseFloat((futuresOrder.liquidation_price/100).toString()).toFixed(2)}</td>
                {calculateEarnings(futuresOrder)}
                <td className="lg:flex items-baseline hidden">{parseFloat((futuresOrder.usdc_size/100).toString()).toFixed(2)} (<p style={{fontSize: "10px"}}>x</p>{futuresOrder.leverage})</td>
                <td className="items-center">{futuresOrder.take_profit ? futuresOrder.take_profit / 100: "-"} {futuresOrder.stop_loss ? futuresOrder.stop_loss / 100 : "-"}</td>
                <td>
                    <form>
                        <input type="submit" value="Close" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                    </form>
                </td>
            </tr>
        )))
    };
    const renderPendingOrders = () => {
        const pendingOrders = futuresOrders?.filter(futuresOrder => futuresOrder.status === 'PENDING');
        if (!pendingOrders || pendingOrders.length === 0) {
            return <tr><td colSpan={9}>No open orders available.</td></tr>;
        }

        return (
            
            pendingOrders.map((futuresOrder) => (
            
            <tr key={futuresOrder.id} className="align-middle items-end my-2">
                
                <td className={clsx(futuresOrder.side === "LONG" ? "text-green-500" : "text-red-500")}>{futuresOrder.symbol} - USDT</td>
                <td className="items-center">{futuresOrder.usdc_size/100}</td>
                <td className="items-center">{futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.liquidation_price / 100}</td>
                <td className="items-center">{futuresOrder.take_profit ? futuresOrder.take_profit / 100: "-"} {futuresOrder.stop_loss ? futuresOrder.stop_loss / 100 : "-"}</td>
                <td>
                    <form>
                        <input type="submit" value="Close" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                    </form>
                </td>
            </tr>
        )))
    };

    const renderClosedOrders = () => {
        const closedOrders = futuresOrders?.filter(futuresOrder => futuresOrder.status === 'CLOSED');
        if (!closedOrders || closedOrders.length === 0) {
            return <tr><td colSpan={9}>No pending orders available.</td></tr>;
        }

        return (
            
            closedOrders.map((futuresOrder) => (
            
            <tr key={futuresOrder.id} className="align-middle items-end my-2">
                
                <td className={clsx(futuresOrder.side === "LONG" ? "text-green-500" : "text-red-500")}>{futuresOrder.symbol} - USDT</td>
                <td className="items-center">{Number((futuresOrder.usdc_size/100 * futuresOrder.leverage) / (futuresOrder.price/100)).toFixed(4)}</td>
                <td className="items-center">{futuresOrder.usdc_size / 100}</td>
                <td className="items-center">{futuresOrder.leverage}</td>
                <td className="items-center">{futuresOrder.price / 100}</td>
                <td className="items-center">{futuresOrder.liquidation_price / 100}</td>
                <td className="items-center">{futuresOrder.close_price ? futuresOrder.close_price / 100 : "-"}</td>
                <td className="items-center">{futuresOrder.pnl ? futuresOrder.pnl / 100 : "-"   }</td>
            </tr>
        )))
    };
    const calculateEarnings = (futuresOrder: FuturesOrder)=>{
        const orderTokenSize = (futuresOrder.usdc_size/100 * futuresOrder.leverage) / (futuresOrder.price/100);
        if (futuresOrder.symbol === symbol){
            const orderDifference =(futuresOrder.price/100) - Number(markPrice.toFixed(2)) ;
            if (futuresOrder.side === "SHORT"){
                if (futuresOrder.price/100 >= Number(markPrice.toFixed(2))){
                    return <td className="text-green-500">+ {(orderTokenSize * orderDifference).toFixed(2)} (+{((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
                else{
                    return <td className="text-red-500">- {(orderTokenSize * orderDifference).toFixed(2)} (-{((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
            }
            else if(futuresOrder.side === "LONG"){
                if(futuresOrder.price/100 <= Number(markPrice.toFixed(2))){
                    return <td className="text-green-500">+ {(orderTokenSize * orderDifference).toFixed(2)} (+{((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
                else{
                    return <td className="text-red-500">-{(orderTokenSize * orderDifference).toFixed(2)} (-{((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
            }
        }
        else{
            const orderDifference = Number(otherMarkPrice.toFixed(2)) - (futuresOrder.price/100);
            if (futuresOrder.side === "SHORT"){
                if (futuresOrder.price/100 >= Number(otherMarkPrice.toFixed(2))){
                    return <td className="text-green-500">+ {(orderTokenSize * orderDifference).toFixed(2)} ({((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
                else{
                    return <td className="text-red-500">{(orderTokenSize * orderDifference).toFixed(2)} ({((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
            }
            else if(futuresOrder.side === "LONG"){
                if(futuresOrder.price/100 <= Number(otherMarkPrice.toFixed(2))){
                    return <td className="text-green-500">+ {(orderTokenSize * orderDifference).toFixed(2)} ({((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
                else{
                    return <td className="text-red-500">{(orderTokenSize * orderDifference).toFixed(2)} ({((orderTokenSize * orderDifference) * 100 / (futuresOrder.usdc_size/100)).toFixed(2)}%) </td>
                }
            }
        }
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
                {activeTab === "open" && 
                    <table className="w-full my-4">
                        <thead>
                            <tr className="align-middle items-center">
                                <th>PAIR</th>
                                <th className="hidden lg:block">VALUE</th>
                                <th>ENTRY PRICE</th>
                                <th>CURRENT PRICE</th>
                                <th>LIQUIDATION PRICE</th>
                                <th>EARNINGS</th>
                                <th className="hidden lg:block">MARGIN</th>
                                <th>TP/SL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderOpenOrders()}
                        </tbody>
                    </table>
                }
                {activeTab === "pending" &&
                    <table className="w-full my-4">
                        <thead>
                            <tr className="align-middle items-center">
                                <th>PAIR</th>
                                <th>AMOUNT</th>
                                <th>LEVERAGE</th>
                                <th>ENTRY PRICE</th>
                                <th>LIQUIDATION PRICE</th>
                                <th>TP / SL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderPendingOrders()}
                        </tbody>
                    </table>
                }
                {activeTab === "closed" && 
                    <table className="w-full my-4">
                        <thead>
                            <tr className="align-middle items-center">
                                <th>PAIR</th>
                                <th>SIZE</th>
                                <th>AMOUNT</th>
                                <th>LEVERAGE</th>
                                <th>ENTRY PRICE</th>
                                <th>LIQUIDATION PRICE</th>
                                <th>CLOSE PRICE</th>
                                <th>EARNINGS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderClosedOrders()}
                        </tbody>
                    </table>
                }
            </footer>
        </div>
    
    )
}