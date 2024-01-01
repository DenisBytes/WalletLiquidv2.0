"use server";
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
            <div className="flex flex-col justify-center rounded-xl bg-[var(--components-background)] py-10 px-20 learn-div">
                <h1 style={{ fontSize: "35px"}}>Call Options Basics</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> The basics of using call options</li>
                        <li> The concept of going &quot;long&quot; or &quot;short&quot;</li>
                        <li> Long calls</li>
                        <li> Short calls</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Long and Short Positions</h2>
                <p className="text-[#909090]">
                    You might have heard a common terminology thrown around in investing: &quot;<strong>long</strong>&quot; and &quot;<strong>short</strong>&quot;. <br/><br/>

                    To put it simply, going &quot;long&quot; or &quot;short&quot; is just financial jargon for saying &quot; I&apos;m buying&quot; or &quot;I&apos;m selling&quot;. In this article, we&apos;ll talk about two very basic ways to implement options in investing: <strong>long</strong> and <strong>short</strong> options. <br /><br/>
                </p>

                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>&quot;<strong>Going long</strong>&quot; or entering a long position means an investor is purchasing an asset or instrument with the expectation of value increasing.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>&quot;<strong>Going short</strong>&quot; or entering a short position means an investor is selling an asset or instrument with the expectation of value decreasing.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is a Long Call?</h2>
                <p className="text-[#909090]">
                    A <strong>long call</strong> is when an investor purchases a call option with the hope that the price of the underlying asset will rise above the strike price.<br/><br/>

                    If the price of the underlying asset increases above the strike price, the holder can exercise or potentially sell back the option to make a profit. If the price of the underlying asset does not increase above the strike price, the holder can let the option expire and only lose the cost of the premium. <br/><br/>

                    <strong>Let&apos;s look at an example of a long call in practice:</strong> <br/><br/>

                    John believes that the price of ETH, which is currently trading at $3,000, will increase in the near future. <br /><br />

                    Instead of buying ETH outright, John decides to purchase a call option on ETH, with a strike price of $3,200, expiring in three months. John pays a premium of $150 for the option. Three months later, the price of ETH has indeed increased, and its now trading at $3,500. Since John holds a call option with a strike price of $3,200, he can exercise the option and buy ETH at the lower price, and then sell it immediately at the higher market price, making a profit. <br/><br/>

                    In this example, John successfully profited from a <strong>long call</strong> position. <br /><br />

                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Long Calls:</strong> If the price of the underlying asset <strong>increases</strong> above the strike price, the holder can exercise or potentially sell back the option to make a profit.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Long Calls:</strong> If the price of the underlying asset <strong>doesn&apos;t</strong> increase above the strike price, the holder can let the option expire and only lose the cost of the premium.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is a Short Call?</h2>
                <p className="text-[#909090]">
                    Selling a call option is known as taking a <strong>short call position</strong>. <br/><br/>

                    This position is taken by an investor who believes that the price of the underlying asset will remain the same or decrease. By selling a call option, the investor collects the premium and hopes that the option will expire out of the money, allowing them to keep the premium collected. <br/><br/>

                    However, if the price of the underlying asset increases above the strike price, the investor may be obligated to sell the asset at the lower strike price, resulting in a loss. Therefore, short call positions are considered risky, and it&apos;s important to have a solid understanding of the market and underlying asset when using them. <br/><br/>

                    <strong>Let&apos;s  look at an example of a short call in practice:</strong> <br/><br/>

                    Alice owns 1 ETH, which is currently trading at $3,000, and she doesn&apos;t expect the price to increase significantly in the near future. <br /><br />

                    Alice decides to sell a call option on her ETH with a strike price of $3,700, expiring in one month. Alice collects a premium of $100 for the option. <br /><br />

                    One month later, the price of ETH remains below the strike price of the option, and the option expires worthless. Alice keeps the premium of $100 as profit. <br /><br />

                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Short Calls:</strong> If the option expires while the underlying asset is <strong>below</strong> the strike price, the seller of the option will profit from the premiums sold.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Short Calls:</strong> If the option expires while the underlying asset is <strong>above</strong> the strike price, the seller of the option might have to sell the asset at the strike price, ending up at a loss.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Use Cases for Call Options</h2>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Speculation: </strong> If the option expires while the underlying asset is <strong>below</strong> the strike price, the seller of the option will profit from the premiums sold.Long call positions can be used to speculate on the future price movements of an underlying asset. For example, if an investor believes that the price of BTC will increase, they can purchase BTC call options without having to own any BTC, potentially making a profit.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Hedging:</strong> Call options can theoretically be used to hedge against potential losses in existing short positions. For instance, if an investor holds an underlying short position and is concerned about a potential rise in price, they can purchase call options to cap potential losses in the event of the price increasing.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Yield:</strong> Investors can generate income by entering short call positions. As long as the price of the underlying asset does not increase above the strike price, the investor can generate income from the premiums collected.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Strategies:</strong> Since they are inherently low-risk and cheap, call options can be used in a multitude of strategies for different purposes. Investors can combine long and short call positions to create complex strategies that aim to maximize profits and minimize losses.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}> Key Takeaways</h2>
                <p className="text-[#909090]">
                    In conclusion, call options give the holder the right (but not the obligation) to buy an underlying asset at a specific strike price at a pre-determined expiration date. <br/><br/>

                    Long call positions are used to speculate on the future price movements of an underlying asset, while short call positions can be used to generate income and profit from assets already held by an investor. <br/><br/>
                    
                    Call options can also be used for hedging and implementing complex strategies. However, it&apos;s important to remember that like other financial instruments, call options are complex and involve significant risks, so it&apos;s crucial to fully understand their properties before using them as part of an investment strategy. <br /><br/>
                </p>
                <ChapterQuiz user={user} 
                    question="When a trader enters a &apos;long call&apos; position to speculate on price movements, where do they expect the price to go?" 
                    answer1="Down" 
                    answer2="Up" 
                    answer3="Sideways" 
                    correctAnswer="second" 
                    chapterNum={7} />
            </div>
        </div>
    )
}