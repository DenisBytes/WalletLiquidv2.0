import Link from 'next/link'

export default function Home() {
    return (
        <div className='links-container hidden md:flex items-center justify-around overflow-hidden px-0' style={{height: '80vh', width: "100%"}}>
            <div className='externals'>
                <Link href='/home/trade/futures/BTC' className='home-links border border-transparent'>Trade</Link>
            </div>
            <div>
                <div className='home-logo'></div>
            </div>
            <div className='externals'>
                <Link href='/home/learn' className='home-links border border-transparent'>Learn</Link>
            </div>
        </div>
    )
}
