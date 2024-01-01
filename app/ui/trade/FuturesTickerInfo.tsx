export default function FuturesTickerInfo({markPrice, indexPrice, fundingRate, openInterest}: {markPrice:number, indexPrice:number, fundingRate:number, openInterest:number}) {
    const openInterestUsdc = openInterest*markPrice;
    const formattedOpenInterest = openInterestUsdc.toLocaleString('en-US', { maximumFractionDigits: 2 });

    return (
        <div className="lg:flex lg:justify-around xl:justify-between items-center ticker-info py-0 px-4 hidden lg:w-1/2">
            <div className="flex flex-col items-center">
                <p style={{fontSize: "14px"}}>MARK PRICE:</p>
                <p style={{fontSize: "14px"}}>{markPrice.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center">
                <p style={{fontSize: "14px"}}>INDEX PRICE:</p>
                <p style={{fontSize: "14px"}}>{indexPrice.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center">
                <p style={{fontSize: "14px"}}>FUNDING RATE:</p>
                <p style={{fontSize: "14px"}}>{fundingRate.toFixed(2)}%</p>
            </div>
            <div className="flex flex-col items-center">
                <p style={{fontSize: "14px"}}>OPEN INTEREST:</p>
                <p style={{fontSize: "14px"}}>{formattedOpenInterest}</p>
            </div>
        </div>
    )
}