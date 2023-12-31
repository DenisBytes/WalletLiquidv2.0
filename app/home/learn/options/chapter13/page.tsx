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
            <div className="flex flex-col justify-center rounded bg-[var(--components-background)] py-10 px-20 " style={{width: "65%",boxShadow:"var(--primary-color) 0px 2px 4px 0px, var(--primary-color) 0px 2px 16px 0px;"}}>
                <h1 style={{ fontSize: "35px"}}>Intrinsic and Extrinsic Value</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> The basics of intrinsic and extrinsic value in DeFi options</li>
                        <li> Factors affecting intrinsic and extrinsic value</li>
                        <li> Key implications for DeFi options traders</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is Intrinsic Value?</h2>
                <p className="text-[#909090]">
                    The <strong>intrinsic value</strong> of an option is the difference between the strike price and the current market price of the underlying asset. <br /><br />

                    On the other hand, extrinsic value, also known as time value, is the portion of an option&apos;s price that is above its intrinsic value. Extrinsic value reflects the market&apos;s expectation of the option&apos;s future volatility, time remaining until expiration, and the cost of carrying the underlying asset. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Factors Affecting Intrinsic and Extrinsic Value</h2>
                <p className="text-[#909090]">
                    The intrinsic value of a call option is the current market price of the underlying asset minus the strike price, while the intrinsic value of a put option is the strike price minus the current market price of the underlying asset.<br /><br />

                    For example, if ETH is trading at $3,000, and you hold a call option with a strike price of $2,500, the intrinsic value of the option is $500. However, if the call option has a premium of $800, the extrinsic value would be $300. <br /><br />

                    The extrinsic value of an option can fluctuate depending on several factors, such as the time remaining until expiration, the implied volatility of the underlying asset, and interest rates. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>Higher implied volatility will result in a higher extrinsic value of an option, as the market expects larger price swings, and the option is more likely to become profitable.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>The time remaining until expiration also affects an option&apos;s extrinsic value. The longer the time remaining until expiration, the more time the option has to become profitable, and therefore, the higher the extrinsic value.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>Finally, interest rates can affect the extrinsic value of an option. If interest rates are high, there is a higher cost of carrying the underlying asset, which increases the extrinsic value of call options and decreases the extrinsic value of put options.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Determining the Value of DeFi Options</h2>
                <p className="text-[#909090]">
                    To evaluate the value of DeFi options, you must consider the intrinsic and extrinsic value, as well as the market conditions and your investment objectives. <br /><br />

                    When assessing the intrinsic value of an option, compare the strike price to the current market price of the underlying asset. If the option is in-the-money, meaning the intrinsic value is positive, it may be worthwhile to exercise the option to realize a profit. If the option is out-of-the-money, meaning the intrinsic value is negative, it may be best to let the option expire worthless. <br /><br />

                    The extrinsic value of an option can be more difficult to assess, as it is dependent on several factors that can change over time. Consider the time remaining until expiration, the implied volatility of the underlying asset, and interest rates. A higher extrinsic value may indicate that the market is expecting large price swings in the underlying asset, making the option more valuable.
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Hedging: </strong>Options with a lower extrinsic value may be more suitable for hedging, as they offer more protection in the event of a market downturn.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Leverage:</strong> If you are looking to leverage your position, options with a higher extrinsic value may provide greater potential for profit. However, that&apos;s not all there is to it - remember to consider multiple factors before making an investment decision.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Takeaways</h2>
                <p className="text-[#909090]">
                    Understanding the intrinsic and extrinsic value of DeFi options is essential when evaluating their worth. <br /><br />

                    The intrinsic value is the difference between the strike price and the current market price of the underlying asset, while the extrinsic value is the portion of the option&apos&apos;s price above its intrinsic value, reflecting the market&apos;s expectation of the option&apos;s future volatility, time remaining until expiration, and cost of carrying the underlying asset. <br /><br />

                    Several factors, such as the time remaining until expiration, implied volatility, and interest rates, can affect an option&apos;s extrinsic value. When evaluating the value of DeFi options, consider both intrinsic and extrinsic value, as well as market conditions and personal goals. <br /><br />
                </p>
                <ChapterQuiz user={user} 
                    question="What is the extrinsic value of an option?" 
                    answer1="The time value derived from an options potential of expiring in-the-money before expiry." 
                    answer2="The inherent value of an option." 
                    answer3="The profit made from exercising the option." 
                    correctAnswer="first" 
                    chapterNum={13} />
            </div>
        </div>
    )
}