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
                <h1 style={{ fontSize: "35px"}}>Use Cases for DeFi Options</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> The basics of options in DeFi</li>
                        <li> Hedging</li>
                        <li> Leverage</li>
                        <li> Earning yield</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Options Recap</h2>

                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Options</strong> are financial derivatives that give the buyer the right to buy or sell an underlying asset at a specific strike price at a specified date.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call Options</strong> give their holder the right to purchase the underlying asset at the strike price, while <strong>put options</strong> give the right to sell the underlying asset at the strike price.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A <strong>derivative</strong> is a financial contract that derives it&apos;s value from an underlying asset or group of assets, such as ETH or a liquidity pool.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>European</strong> options can only be exercised at the expiration date, while <strong>American</strong> options can be exercised at any time before the expiration date.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A <strong>premium</strong> is the price paid for an option. The premium is also the profit earned by the seller of an option.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>The <strong>strike price</strong> is the price at which the underlying asset can be purchased or sold at.</p>
                </div>
                <p className="text-[#909090]">
                    Now, let&apos;s get started with the different use cases for DeFi options; hedging, leverage & speculation, and yield. <br/><br/>
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Hedging Using DeFi Options</h2>
                <p className="text-[#909090]">
                    <strong>Hedging</strong> is a way to reduce risk for an asset or position.<br/><br/>

                    For example, if you hold some ETH and expect prices to fall in the near term, you can buy ETH put options with a near-term expiration to provide some cushioning if prices fall. The option will act as insurance for your assets. Just like your insurance costs a small premium, so does the option, which is a cheap trade-off for the protection provided. <br/><br/>

                    <strong>Let&apos;s take a look at hedging with options in practice:</strong> <br/><br/>

                    Bob bought 10 ETH at $1500 each for a total investment of $15,000. He&apos;s worried that the price of ETH might drop in the next month, so he decides to use a put option to hedge his position. Bob buys a put option with a strike price of $1500 and an expiration date one month from now. The option premium is $200, so Bob pays a total of $2000 for the option. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If the price of ETH drops below $1500 during the next month, the put option will give Bob the right to sell his ETH at $1500, which would limit his losses.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>If the price of ETH rises, Bob will still profit from his ETH, having only paid the option premium to protect his assets.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Leverage and Price Speculation With DeFi Options</h2>
                <p className="text-[#909090]">
                    <strong>Leverage</strong> amplifies your current position, while <strong>price speculation</strong> means making a bet (speculating) on the direction of an assets price. <br/><br/>

                    For example, a trader who holds ETH could leverage their upside by borrowing more ETH, with the goal of selling it back at a higher price. <br/><br/>

                    Price speculation and leverage always come with a high level of risk. If a trader buys ETH call options because they think prices will go up, but ETH decreases in value, the trader will lose the money they paid for the call options. Similarly, if the trader expects prices to fall and borrows ETH to sell it at the current price, they will end up at a massive loss if ETH rises in value. <br/><br/>

                    <strong>Let&apos;s look at leverage and speculation with options in practice:</strong> <br/><br/>

                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If ETH then rallies to $1400 in the following days, Bob can profit from his calls, having successfully leveraged his upside exposure with options.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>If ETH ends up stagnating or decreasing in price, Bobs losses will be amplified with the premiums paid. That&apos;s the risk of using leverage - not only can Bob win more, he can also lose more.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Earning Yield With DeFi Options</h2>
                <p className="text-[#909090]">
                    There are two main ways to earn from DeFi options without trading them directly; <strong>liquidity pools</strong> and <strong>strategy vaults</strong>. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Liquidity pools</strong> are used to facilitate trading on decentralized platforms like Premia. In exchange for providing liquidity to the platform, depositors can earn <strong>trading fees</strong> and <strong>option premiums</strong>.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Strategy Vaults</strong> are automated, pre-packaged investing or trading strategies that execute themselves on a continuous basis. They can be based on a multitude of different strategies, e.g. underwriting options, and the potential profit depends on the specific strategy of a given vault.</p>
                </div>
                <p className="text-[#909090]">
                    While <strong>liquidity pools</strong> can be lucrative, they are typically more suited to experienced users due to the amount of management required to maximize profits.<br/><br/>

                    In turn, <strong>strategy vaults</strong> can be the better choice for users who don&apos;t want to invest too much time and effort, and want a simple solution for earning yield from options. <br/><br/>

                    Both choices can be extremely lucrative, and are suitable for different types of investors and investing strategies. <br/><br/>
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}> Key Takeaways</h2>
                <p className="text-[#909090]">
                    Let&apos;s summarize.

                    Options are inherently low-risk, since the maximum downside for a trader is the premium paid for the option, allowing them to be used for a variety of purposes. <br/><br/>

                    Here&apos;s a quick recap of the applications that DeFi options are especially useful for: <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Hedging</strong> is a way to protect your current positions and holdings from risk.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Leverage</strong> is a way to amplify your potential upside (and downside).</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Earning yield</strong> is a way to profit from options without directly trading them. This can be done by depositing assets into <strong>liquidity pools</strong> or automated <strong>strategy vaults</strong>.</p>
                </div>
                <ChapterQuiz user={user} question="What are the use cases for DeFi options?" answer1="Betting on price action and leveraging short positions." answer2="Hedging, speculation, directional exposure, leverage and yield-farming." answer3="Earning yield from liquidity pools, strategy vaults, and copy-trading." correctAnswer="second" chapterNum={6} />
            </div>
        </div>
    )
}