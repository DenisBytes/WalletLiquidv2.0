import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import ChapterQuiz from "@/app/ui/learn/options/ChapterQuiz";
import { auth } from "@/auth";

export default async function Page() {
    let user: User | undefined;
    const session = await auth();
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
    }
    return (
        <div className="flex justify-center w-full my-8" style={{fontFamily:"sans-serif", fontSize: "20px"}}>
            <div className="flex flex-col justify-center rounded bg-[var(--components-background)] py-10 px-20 " style={{width: "50%",boxShadow:"var(--primary-color) 0px 2px 4px 0px, var(--primary-color) 0px 2px 16px 0px;"}}>
                <h1 style={{ fontSize: "35px"}}>Implied and Realized Volatility</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> Implied volatility</li>
                        <li> Realized (historical) volatility</li>
                        <li> Implications of volatility in DeFi options</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Volatility in DeFi Options</h2>
                <p className="text-[#909090]">
                    <strong>Volatility</strong> is a measure of how much and how fast the price of an asset such as ETH can change over a short period of time.

                    In the DeFi markets, volatility is especially important to understand, as it directly affects the risk and return of different DeFi products such as options and liquidity pools.

                    There are two ways to measure volatility: <strong>implied volatility</strong> and <strong>realized volatility</strong>.
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Understanding Implied Volatility</h2>
                <p className="text-[#909090]">
                    Implied volatility is an estimate of how uncertain and unpredictable the price of an asset will be in the future.<br/><br/>

                    It&apos;s like predicting the weather over the next few months. Just like a weather forecast, implied volatility is based on various factors and conditions.

                    When the forecast indicates high volatility, traders may be more likely to purchase options to profit from potential price swings. Conversely, when the forecast calls for low volatility, traders may be less likely to purchase options, and may use strategies more fit for calmer markets, such as selling options.
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If the markets are implying a <strong>high</strong> level of volatility for an asset like ETH, the price is expected to <strong>move a lot</strong> in the future.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>If the markets are implying a <strong>low</strong> level of volatility for an asset like ETH, the price is expected to <strong>move less</strong>.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Realized Volatility: Historical Price Movement</h2>
                <p className="text-[#909090]">
                    <strong>Realized volatility</strong> (also called historical volatility) measures the past price movement of an asset over a specified period. <br /><br />

                    Realized volatility can be used to find correlations and historical patterns, as well as used as an indicator of the actual price risk of an underlying asset. <br /><br />

                    For example, if implied volatility is higher than realized volatility, it means that the markets expect unusually high volatility in the underlying asset. Among other implications, this means an option might be overpriced on average, signaling traders to sell premiums. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Realized volatility</strong> is an indicator of the actual historically recorded price risk of an underlying asset.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Implied volatility</strong> is an indicator of the expected future price risk of an underlying asset.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Implications for Traders and Investors in DeFi</h2>
                <p className="text-[#909090]">
                    Understanding implied volatility is especially important, since it directly affects the pricing of options and the risk-return profile of DeFi options strategies.
                </p>
                <div className="w-full flex justify-between">
                    <div className="w-1/2">
                        <h2>Pricing</h2>
                        <p className="text-[#909090]">
                            High implied volatility means that an option is more likely to expire in the money. This means a higher premium since the buyer has a higher chance of profiting, and the seller takes on more risk. As a result, options with low implied volatility generally have a cheaper premium, while high implied volatility results in a more expensive premium. <br /><br />
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2>Implied Volatility in DeFi</h2>
                        <p className="text-[#909090]">
                            DeFi protocols and digital assets operate in a highly dynamic environment, which can lead to rapid changes in market conditions and implied volatility. It is important for traders and investors alike to stay informed about the volatility of the assets they are exposed to, and how it might impact pricing and risk. <br /><br />
                        </p>
                    </div>
                </div>
                <p className="text-[#909090]">
                    In summary, volatility is a crucial concept in the DeFi market, and understanding implied and realized volatility can help traders and investors make more informed decisions.
                </p>
                <ChapterQuiz user={user} question="What is the difference between implied and realized volatility?" answer1="Implied volatility doesn't matter, since it's not based on actual data." answer2="Implied volatility is based on what the markets expect, whereas realized volatility is based on historical data." answer3="Realized volatility is real, while implied volatility is merely an analyst's prediction." correctAnswer="second" chapterNum={11} />
            </div>
        </div>
    )
}