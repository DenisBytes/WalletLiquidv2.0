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
                <h1 style={{ fontSize: "35px"}}>Call-Put Parity</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 Understanding call-put parity</h2>
                    <p>In this article, you&apos;ll learn about:</p>
                    <ul className="ml-6 sub-title">
                        <li> What call-put parity means</li>
                        <li> How to understand it</li>
                        <li> When it&apos;s important</li>
                        <li> Key implications for traders</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is the Call-Put Parity?</h2>
                <p className="text-[#909090]">
                    Call-put parity is an essential concept to understand, as it&apos;s directly tied to understanding options arbitrage.<br /><br />

                    Call-put parity states that the difference between the price of a call option and a put option with the same strike price and the expiration date is equal to the difference between the underlying asset&apos;s current price and the present value of the strike price (discounted at the risk-free interest rate). <br /><br />

                    In other words, if two options have the same terms, their prices should maintain this relationship to prevent arbitrage opportunities. In practice, it&apos;s a bit more in-depth. Let&apos;s dive deeper.<br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call-put parity</strong> is a principle that helps traders identify profitable price differences between options with identical terms.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Call-Put Parity: An Advanced Explanation</h2>
                <p className="text-[#909090]">
                    Call-put parity can be expressed using the following formula:<br /><br />

                    <em>C - P = S - PV(K)</em> <br /><br />

                </p>
                <ul className="text-[#909090] sub-title ml-8">
                    <li>C is the price of the European call option</li>
                    <li>P is the price of the European put option</li>
                    <li>S is the current price of the underlying asset</li>
                    <li>PV(K) is the present value of the strike price (K) discounted at the risk-free interest rate</li>
                </ul>

                <br /><br />

                <p className="text-[#909090]">

                    Call-put parity is a fundamental principle in options pricing that establishes a relationship between the prices of call options, put options, and the underlying asset. It states that the sum of a long call option and a short put option with the same strike price and expiration date is equivalent to holding the underlying asset, and vice versa. <br /><br />

                    The call-put parity equation can be expressed as follows: <br /><br />

                    <em>Call Price - Put Price = Stock Price - Strike Price</em> <br /><br />

                    This equation implies that if the prices of call and put options, along with the stock price and strike price, are known, the relationship should hold. If any of the prices are mispriced or deviate from the parity equation, an arbitrage opportunity may exist. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Applications for Call-put Parity</h2>
                <p className="text-[#909090]">
                    <strong>1. Pricing Options:</strong> Call-put parity can be used as a tool to validate the prices of options. If the prices of call and put options deviate from the parity equation, it may indicate an opportunity for traders to take advantage of mispriced options. <br /><br />

                    <strong>2. Synthetic Positions:</strong> Call-put parity allows traders to create synthetic positions by combining different options and the underlying asset. For example, if a trader wants to replicate a long stock position, they can buy a call option and sell a put option with the same strike price and expiration. This synthetic position provides a similar risk-reward profile to owning the underlying asset. <br /><br />

                    <strong>3. Risk Management:</strong> Call-put parity helps in managing risk by understanding the relationships between options and the underlying asset. It enables traders to hedge their positions or construct strategies that provide specific risk-reward characteristics.<br /><br />

                    <strong>4. Arbitrage Opportunities:</strong> If the prices of call and put options, along with the underlying asset price and strike price, deviate from the parity equation, traders can exploit arbitrage opportunities. By simultaneously buying and selling mispriced options and the underlying asset, traders can lock in risk-free profits.<br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call-put Parity</strong> is an essential concept specifically for understanding arbitrage opportunities, synthetic positions, and further risk management.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Call-Put Parity in Practice</h2>
                <p className="text-[#909090]">
                    Let&apos;s say you&apos;re analyzing the options market for a specific cryptocurrency, and you notice a discrepancy in the prices of call and put options with the same strike price and expiration date. By applying the call-put parity principle, you can determine if an arbitrage opportunity exists: <br /><br />

                    1. Calculate the call-put parity value using the formula above. <br /><br />

                    2. Compare the calculated value to the observed difference between the call and put option prices. <br /><br />

                    3. If there&apos;s a significant deviation, you can consider taking advantage of the mispricing by executing a combination of long and short positions in both call and put options, as well as the underlying cryptocurrency. <br /><br />
                </p>

                <ChapterQuiz user={user} 
                    question="Which description best matches that of call-put parity?"
                    answer1="Call-put parity states that the sum of a long call spread and a long put spread with the same strike price and expiration date is equivalent to holding the underlying asset, and vice versa." 
                    answer2="Call-put parity is a fundamental principle that states the sum of a short call and short put is equal to simply holding the underlying asset."
                    answer3="Call-put parity is a fundamental principle, stating that the sum of a long call option and a short put option with the same strike price and expiration date is equivalent to holding the underlying asset, and vice versa." 
                    correctAnswer="third" 
                    chapterNum={18} />
            </div>
        </div>
    )
}