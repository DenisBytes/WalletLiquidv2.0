"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function BTCETHButtons() {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-around w-52 px-4">
            <Link
                className={`symbol-button`}
                href="/home/trade/futures/BTC"
                style={{
                    background:
                        pathname === '/home/trade/futures/BTC'
                            ? 'linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(248,216,20,1) 100%)'
                            : 'var(--components-background)', // default background for inactive
                    color: pathname === '/home/trade/futures/BTC' ? 'white' : 'initial', // default color for inactive
                }}
                
            >
                <p>BTC</p>
            </Link>
            <Link
                className={`symbol-button`}
                href="/home/trade/futures/ETH"
                style={{
                    background:
                        pathname === '/home/trade/futures/ETH'
                            ? 'linear-gradient(90deg, rgba(72,168,229,1) 0%, rgba(44,229,154,1) 100%)'
                            : 'var(--components-background)', // default background for inactive
                    color: pathname === '/home/trade/futures/ETH' ? 'white' : 'initial', // default color for inactive
                }}
                
            >
                <p>ETH</p>
            </Link>
        </div>
    );
}