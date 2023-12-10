"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'rade', firstLetter: 'T', href: '/home/trade/futures/BTC'},
    { name: 'earn', firstLetter: 'L', href: '/home/learn'},
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className='flex items-center link-container'>
            <Link href="/home" className='flex items-center space-x-4 mr-5'>
                <div className='nav-logo nav-links'></div>
            </Link>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("hidden md:flex items-center space-x-2 p-4 font-medium link")}
                    >
                        <p className="hidden md:block nav-links" style={{fontSize: "15px", fontWeight:700}}><span style={{fontSize: "17px"}}>{link.firstLetter}</span>{link.name}</p>
                    </Link>
                );
            })}
            <div className="animation start-home">fo</div>
        </div>
    );
}
