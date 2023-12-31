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
                <h1 style={{ fontSize: "35px"}}>Understanding Derivatives</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> Financial derivatives</li>
                        <li> Why and when derivatives are used</li>
                        <li> The differences between options and futures</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What Are Derivatives?</h2>
                <p className="text-[#909090]">Financial derivatives are a versatile alternative to traditional investing.<br/><br/>

                    They provide a way for investors to manage risk, protect their investments, and potentially profit from market movements without directly owning the underlying asset.<br/><br/>

                    In DeFi, the value of a financial derivative is generally derived from an asset or a group of assets, such as ETH or a liquidity pool.<br/><br/>

                    In traditional finance, their value can be derived from things like stocks, commodities, currencies, or interest rates. Derivatives can be bought and sold, unlocking a new avenue of trading beyond just buying and selling assets.<br/><br/>

                    Different types of derivatives (such as perpetual futures and options) vary greatly, and each of them serve a specific purpose. <br/><br/>
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>What Are Derivatives Useful For?</h2>
                <p className="text-[#909090]">
                    There are several reasons why traders and investors may choose to use financial derivatives instead of simply buying an asset.<br/><br/>

                    Let&apos;s go over some of the common use cases for derivatives: <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Leverage:</strong> Financial derivatives often allow traders to use leverage. Leverage means being able to control a larger amount of an asset with a relatively small initial investment. Using leverage amplifies potential gains, while also increasing potential losses.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Speculation:</strong> Traders can also use derivatives to make guesses about what might happen in the future. If a trader believes ETH will go up in price, they could use a financial derivative that gives them the potential to profit from ETH going up in price, such as a call option or a perpetual futures contract.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Hedging:</strong> Derivatives can be used to hedge existing positions. Hedging means reducing the potential risks of an asset or investment without having to sell the asset. It can help traders protect their investments against negative price movements.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>4. More Flexibility: </strong> Derivatives offer more flexibility compared to traditional investments. They can be customized to fit various strategies, timeframes, and risk appetites, making different derivatives useful as powerful and flexible tools for investing.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Financial Derivatives in Practice</h2>
                <p className="text-[#909090]">
                    Let&apos;s look at some quick examples of two popular derivatives to get a grasp of how they work in practice: <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Futures:</strong> Bob believes that the price of ETH will fall in the near-term. Bob can then enter a &quot;short&quot; position that locks him into selling ETH at the current price in the future, providing him with the possibility of profiting from the price of ETH falling. If things turn out as Bob expected, and ETH falls in price, Bob will make a profit. If ETH ends up stagnating or rising in price, however, Bob will end up at a loss since he will have to sell ETH below market price.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>2. Options:</strong> Bob just entered a short position on ETH, locking him into selling ETH at the current price in the future. Bob wants to protect himself against potential losses from ETH rising in price, so he buys ETH call options, that give him the right, but not the obligation, to buy ETH at a certain price and date in the future. If ETH falls in price, Bob makes a profit from his short position, and only loses the premium he paid for the call option. If ETH rises in price, Bob profits from his call options, effectively reducing the losses he takes from his short position.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Differences Between Futures and Options</h2>
                <p className="text-[#909090]">
                    At this point, you might be confused about the actual differences between futures and options. If you are able to profit similarly from a futures short position and a put option, what&apos;s the real difference?<br/><br/>
                    In reality, futures and options are worlds apart, so let&apos;s look at the key differences between them: <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Nature of the Contract:</strong> Futures are <strong>agreements</strong> to buy or sell an asset at a fixed price and time in the future, while options give their buyer the <strong>choice</strong> to buy or sell an asset at a fixed price and time in the future.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Profit Potential:</strong> Futures offer theoretically unlimited profit potential but also unlimited loss potential, while options have limited profit potential but also limited loss potential.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Risk and Reward: </strong> Futures are riskier than options because they are binding. The buyer is <strong>obligated</strong> to fulfill the contract even if they lose money. On the other hand, options provide the buyer with a <strong>choice</strong>, offering more flexibility and limited loss potential.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>4. Pricing:</strong> Futures generally have a fixed price determined by the market, while the price for options has to be determined with complex pricing models, such as the popular Black-Scholes.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>5. Flexibility:</strong> Options offer more flexibility than futures contracts, because the buyer has the <strong>choice</strong> to use the option, while futures <strong>must</strong> be fulfilled. Additionally, options can be customized to meet specific objectives and risk profiles, while futures are standardized and less customizable.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Key Takeaways</h2>
                <p className="text-[#909090]">Financial derivatives are an alternative and powerful investment tool to more sophisticated traders.<br/><br/>
                    Derivatives can enable investors and traders to manage risk, protect their investments, and potentially profit from market movements without directly owning an asset. <br/><br/>
                </p>
                <ChapterQuiz user={user} 
                    question="Where does a derivative in DeFi generally get its value from?" 
                    answer1="A real-life asset like oil or gold" 
                    answer2="An asset or group of assets such as ETH or a liquidity pool" 
                    answer3="An option's strike price" 
                    correctAnswer="second" 
                    chapterNum={2} />
            </div>
        </div>
    )
}