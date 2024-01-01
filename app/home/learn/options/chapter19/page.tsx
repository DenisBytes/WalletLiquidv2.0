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
            <div className="flex flex-col justify-center rounded-xl bg-[var(--components-background)] py-10 px-20 learn-div" >
                <h1 style={{ fontSize: "35px"}}>Options Arbitrage</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡  Arbitrage Strategies</h2>
                    <p>In this article, you&apos;ll learn about:</p>
                    <ul className="ml-6 sub-title">
                        <li> What options arbitrage is</li>
                        <li> Requirements for arbitrage</li>
                        <li> How to employ an arbitrage strategy</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is Arbitrage?</h2>
                <p className="text-[#909090]">
                    Arbitrage is a trading strategy employed to exploit price differences in different markets for the same or related assets. <br /><br />

                    In the cryptocurrency context, these markets could be spot markets, futures markets, or options markets, and they could be on centralized exchanges (CEXs), decentralized exchanges (DEXs), or a combination of both. <br /><br />

                    One example of cryptocurrency options arbitrage would be spotting a price discrepancy for a call option for Bitcoin with a June 2nd, 2023 Expiry and a strike price of $26,000 USD. Suppose this option is priced at $1,307.86 on Premia, and $1,484.31 on another exchange. A trader could potentially profit from this $176.46 (per contract) price difference by buying the option on Premia and selling it on the other exchange. <br /><br />

                    Here are the steps in more detail: <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Capital Requirements: </strong> Ensure sufficient capital on both exchanges to purchase the option on one platform and sell it on the other. The capital needed could be substantial as most CEXs offer margin trading, while DEXs typically require 100% collateral.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Buying and Selling: </strong> Buy the option on Premia and simultaneously sell the same option on the other exchange.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Profit Realization: </strong> Wait until the option expires, and if everything goes as planned, pocket the difference as profit.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Prerequisites for Arbitrage</h2>
                <p className="text-[#909090]">
                    Arbitrage can be a great strategy because, when done correctly, it offers the potential for risk-free profit. <br /><br />

                    However, the barriers to entry can be high due to the required capital, technological demands, and need for rapid execution. It&apos;s also worth noting that the opportunities for arbitrage are often fleeting. As they&apos;re identified, traders rush to exploit them, and the price discrepancies quickly disappear. <br /><br />

                    What&apos;s needed to carry out an options arbitrage strategy effectively includes: <br /> <br />
                </p>
                <ul className="text-[#909090] sub-title ml-8">
                    <li>Access to various exchanges, both CEXs and DEXs.</li>
                    <li>Real-time market data to spot arbitrage opportunities as they arise.</li>
                    <li>Sufficient capital on multiple exchanges. Remember, the crypto world doesn&apos;t yet have a Prime Brokerage for Options, so you need to manage funds across different platforms independently.</li>
                    <li>Fast trade execution, preferably via API, to take advantage of short-lived arbitrage opportunities.</li>
                </ul>

                <br /><br />
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Arbitrage</strong> opportunities are short-lived, requiring swift action to capitalize on.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Risks of Arbitrage Trading</h2>
                <p className="text-[#909090]">
                    It&apos;s crucial to note the associated risks. Even though arbitrage is often described as &lsquo;risk-free&lsqo;, several factors can complicate the execution: <br /><br />
                </p>
                <ul className="text-[#909090] sub-title ml-8">
                    <li><strong>System Failures: </strong> A technical glitch on an exchange or in your own system can prevent trades from executing as planned.</li>
                    <li><strong>Market Conditions: </strong>Rapid changes in the market can erase arbitrage opportunities before you can exploit them.</li>
                    <li><strong>Execution Risk: </strong>There&apos;s a risk that one side of your trade might not go through as expected.</li>
                    <li><strong>Counterparty  Risk: </strong> The party on the other side of the trade or the exchange itself might fail to fulfill their obligations. This is less prevalent on decentralized exchanges that utilize smart contracts to facilitate trades.</li>
                </ul>

                <ChapterQuiz user={user} 
                    question="In simple terms, what is options arbitrage?"
                    answer1="A strategy that speculates on the rate of prices changing on different exchanges." 
                    answer2="An options strategy that exploits the price difference of an option on different exchanges to generate a profit."
                    answer3="An options strategy that exploits the difference in volatility across different assets to generate a profit." 
                    correctAnswer="second" 
                    chapterNum={19} />
            </div>
        </div>
    )
}