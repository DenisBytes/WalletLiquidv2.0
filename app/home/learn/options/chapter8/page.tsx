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
                <h1 style={{ fontSize: "35px"}}>Put Options Basics</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> The basics of using put options</li>
                        <li> The concept of going &quot;long&quot; or &quot;short&quot;</li>
                        <li> Long puts</li>
                        <li> Short puts</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is a Long Put?</h2>
                <p className="text-[#909090]">
                    A <strong>long put</strong> is when an investor purchases a put option with the hope that the price of the underlying asset will <strong>fall</strong> below the strike price. <br/><br/>

                    If the price of the underlying asset decreases below the strike price, the holder can exercise or potentially sell back the option to make a profit. If the price of the underlying asset does not decrease below the strike price, the holder can let the option expire and only lose the cost of the premium. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A <strong>long put:</strong> is like a long call, but instead of anticipating the price of an asset to rise, the trader anticipates the price to <strong>fall</strong>.</p>
                </div>
                <p className="text-[#909090]">
                    <strong>Here&apos;s an example of a long put in practice:</strong> <br/><br/>

                    John believes that the price of ETH, which is currently trading at $3,000, will decrease in the near future. Instead of selling his ETH outright, John decides to purchase a put option on ETH, with a strike price of $2,800 and an expiration date in three months. John pays a premium of $200 for the option. <br/><br/>

                    Three months later, the price of ETH has indeed decreased, and is now trading at $2,500. Since John holds a put option with a strike price of $2,800, he can exercise the option and sell ETH at the higher price, and then buy it back immediately at the lower market price, making a profit. <br/><br/>

                    In this example, John successfully profited from a <strong>long put</strong> position.
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Long puts:</strong> If the price of the underlying asset <strong>decreases</strong> below the strike price, the holder can exercise or potentially sell back the option to make a profit.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Long puts:</strong> If the price of the underlying asset <strong>rises or stagnates</strong>, the holder only loses the premiums paid for the options..</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is a Short Put?</h2>
                <p className="text-[#909090]">
                    <strong>Selling</strong> a put option is known as taking a <strong>short put</strong> position.

                    This position is taken by an investor who believes that the price of the underlying asset will remain the same or increase. By selling a put option, the investor collects the premium and hopes that the option will expire out of the money, allowing them to keep the premium collected. <br/><br/>

                    However, if the price of the underlying asset decreases below the strike price, the investor may be obligated to buy the asset at the higher strike price, resulting in a loss. Therefore, short put positions are considered risky, and it&apos;s important to have a solid understanding of the market and underlying asset when using them. <br/><br/>
                </p>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>A <strong>short put:</strong> is like a <strong>short call</strong>, but instead of profiting if the underlying asset falls or stagnates in value, a trader profits if the underlying asset <strong>rises or stagnates</strong> in value.</p>
                </div>
                <p className="text-[#909090]">
                    <strong>Here&apos;s an example of a short put in practice:</strong> <br/><br/>

                    Alice wants to earn yield on her ETH, and expects prices to stagnate over the coming weeks. Alice decides to sell a put option on ETH with a strike price of $2,300, expiring in one month. Alice collects a premium of $150 for the option. <br/><br/>

                    One month later, the price of ETH remains above the strike price of the option, and the option expires worthless. Alice keeps the premium of $150 as profit. <br/><br/>
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Use Cases for Put Options</h2>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Speculation: </strong> Long put positions can be used to speculate on the future price movements of an underlying asset. For example, if an investor believes that the price of ETH will decrease, they can purchase ETH put options without having to own any ETH, potentially making a profit.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Hedging:</strong> Put options can be used to hedge against losses in investments. For instance, if an investor owns ETH and is concerned about a decrease in price, they can purchase put options to protect against potential losses.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Yield:</strong> Options can be used to generate income by selling put options. As long as the price of the underlying asset does not decrease below the strike price, the investor can generate income from the premiums collected.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Strategies:</strong> Put options can be used in a multitude of strategies for different purposes. Investors can combine long and short put positions to create complex strategies that aim to maximize profits and minimize losses.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}> Key Takeaways</h2>
                <p className="text-[#909090]">
                    In conclusion, put options give the holder the right (but not the obligation) to sell an underlying asset at a specific strike price at a pre-determined expiration date. <br /><br />

                    Long put positions are used to speculate on the future price movements of an underlying asset, while short put positions can be used to generate income and profit from an asset&apos;s upside. <br /><br />

                    Put options can also be used for hedging and implementing complex strategies. However, its important to remember that like other financial instruments, put options are complex and involve significant risks, so it&apos;s crucial to fully understand their properties before using them as part of an investment strategy. <br /><br />
                </p>
                <ChapterQuiz user={user} 
                    question="When does a trader generally decide to enter a long put position?" 
                    answer1="Only when they want to speculate on price movements." 
                    answer2="When they expect prices to stagnate over the near future." 
                    answer3="When they either want insurance for their current holdings, or to speculate on prices falling." 
                    correctAnswer="third" 
                    chapterNum={8} />
            </div>
        </div>
    )
}