"use client"
import { useState } from "react";

export function BTCETHButtons() {
    const [symbol, setSymbol] = useState('BTC');
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, symbol: string) => {
        e.preventDefault();
        setSymbol(symbol);
    };
    return (
        <div className="flex items-center justify-around w-52">
                <button
                    className={`symbol-button`}
                    style={{
                        background:
                            symbol === 'BTC'
                                ? 'linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(248,216,20,1) 100%)'
                                : 'var(--components-background)', // default background for inactive
                        color: symbol === 'BTC' ? 'white' : 'initial', // default color for inactive
                    }}
                    onClick={(e) => handleButtonClick(e, 'BTC')}
                >
                    <p>BTC</p>
                </button>
                <button
                    className={`symbol-button`}
                    style={{
                        background:
                            symbol === 'ETH'
                                ? 'linear-gradient(90deg, rgba(72,168,229,1) 0%, rgba(44,229,154,1) 100%)'
                                : 'var(--components-background)', // default background for inactive
                        color: symbol === 'ETH' ? 'white' : 'initial', // default color for inactive
                    }}
                    onClick={(e) => handleButtonClick(e, 'ETH')}
                >
                    <p>ETH</p>
                </button>
            </div>
    );
}