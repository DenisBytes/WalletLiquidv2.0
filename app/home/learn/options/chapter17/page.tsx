import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import ChapterQuiz from "@/app/ui/learn/options/ChapterQuiz";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Page() {
    let user: User | undefined;
    const session = await auth();
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
    }
    return (
        <div className="flex justify-center w-full my-8" style={{fontFamily:"sans-serif", fontSize: "20px"}}>
            <div className="flex flex-col justify-center rounded bg-[var(--components-background)] py-10 px-20 " style={{width: "65%",boxShadow:"var(--primary-color) 0px 2px 4px 0px, var(--primary-color) 0px 2px 16px 0px;"}}>
                <h1 style={{ fontSize: "35px"}}>Understanding The Greeks</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 Options Greeks</h2>
                    <p>In this article, we delve deeper into the Greeks:</p>
                    <ul className="ml-6 sub-title">
                        <li> Delta, Gamma, Theta, Vega, Rho</li>
                        <li> Understanding each one</li>
                        <li> Interactions between Greeks</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Delta</h2>
                <p className="text-[#909090]">
                    This Greek measures the rate of change in the option&apos;s price with respect to changes in the price of the underlying asset. <br /><br />

                    Specifically, Delta measures the sensitivity of an option&apos;s price to a $1 change in the price of the underlying asset, serving as a proxy for the option&apos;s exposure to the underlying price. <br /><br />

                    In the context of cryptocurrency, if you have a Bitcoin option, the Delta would tell you how much the price of that option is expected to change for each $1 change in the price of Bitcoin. For instance, a Delta of 0.6 for a Bitcoin call option suggests that for every $1 increase in Bitcoin price, the option&apos;s price might increase by approximately $0.60. <br /><br />
                </p>
                <div className="flex justify-center">
                    <Image src="/deltavsoption.avif" alt="deltavsoption" width={700} height={428}/>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call Options: </strong> A Delta between 0 and 1 indicates the percentage change in the call option&apos;s price for a $1 increase in the underlying</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Put Options: </strong> A Delta between -1 and 0 represents the percentage change for a $1 decrease in the underlying.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Gamma</h2>
                <p className="text-[#909090]">
                    <strong>Gamma</strong> is often thought of as the &qout;acceleration&qout; of an option. <br /><br />

                    It indicates how much the Delta of an option is expected to change for a $1 change in the underlying price. While Delta gives you the speed of the option&apos;s price change, Gamma provides insights into how that speed is changing. <br /><br />

                    So, if an option has a Gamma of 0.08, it means that for every $1 increase in the underlying asset price, the option&apos;s Delta will increase by 0.08. Conversely, for a $1 decrease in the underlying asset price, the option&apos;s Delta will decrease by 0.08. <br /><br />

                    This is particularly crucial for traders managing portfolios of options or those who want to maintain a Delta-neutral position, as Gamma can cause Delta to change rapidly, especially for options that are at-the-money. <br /><br />
                </p>
                <div className="flex justify-center">
                    <Image src="/gammavsdte.avif" alt="gammavsdte" width={700} height={428} />
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Gamma:</strong> If the underlying asset moves in price, Gamma goes both ways.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Theta</h2>
                <p className="text-[#909090]">
                    <strong>Theta</strong> measures the rate of decline in the value of an option due to the passage of time, also known as time decay. <br /><br />

                    Theta is paid <strong>Daily</strong>. This is important because options have an expiration date, and as that date approaches, the value of the option can decrease rapidly. As the option matures, this erosion of value becomes more pronounced, especially for options that are at or near the money. <br /><br />

                    For those holding a long position in an option, Theta is a constant adversary, chipping away at the option&apos;s value daily. Conversely, for those who have sold or written options, Theta works in their favor, as they benefit from the option&apos;s decreasing value. To navigate the challenges posed by Theta, traders often turn to multi-leg options strategies, which can be designed to offset or take advantage of time decay. <br /><br />
                </p>
                <div className="flex justify-center">
                    <Image src="/timedecay.avif" alt="timedecayofanoption" width={700} height={428} />
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Theta:</strong> Constant adversary for option buyers, constant beneficiary for underwriters.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Vega</h2>
                <p className="text-[#909090]">
                    In the often turbulent waters of the cryptocurrency market, Vega stands as a beacon for understanding volatility. <br /><br />

                    Remember how Delta measures the change in an option&apos;s price for a 1% change in the underlying asset? In a similar manner, Vega measures the change in an option&apos;s price for a 1% change in implied volatility. <br /><br />

                    As implied volatility represents the market&apos;s expectation of future volatility, a rise in this expectation can inflate the option&apos;s price, benefiting those holding long positions. Conversely, a drop can deflate the option&apos;s value. <br /><br />
                </p>
                <div className="flex justify-center">
                    <Image src="/vega.avif" alt="vega" width={700} height={428} />
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Rho</h2>
                <p className="text-[#909090]">
                    In comparison to the other Greeks, Rho is generally more prevalent in traditional markets than it is in DeFi. <br /><br />

                    This is because in traditional markets, Rho gauges the sensitivity of an option&apos;s price to shifts in interest rates. <br /><br />

                    However, while the cryptocurrency world doesn&apos;t operate on conventional interest rates, certain mechanisms, like staking or yield farming, offer returns that can be likened to earning interest. Thus, while Rho might not have a direct counterpart in crypto options, understanding its implications in a broader financial context can be beneficial. <br /><br />
                </p>

                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>The Greeks:</strong> Massively beneficial to understand in navigating the markets, managing risk, and employing strategies.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Interactions Between The Greeks</h2>
                <p className="text-[#909090]">
                    <strong>The Greeks</strong> interact with each other in different ways. These reactions are important to understand for traders to effectively manage their positions. <br /><br />
                </p>




                <div className="w-full flex justify-between">
                    <div className="w-1/2">
                        <h2>Delta and Gamma</h2>
                        <p className="text-[#909090]">
                            Gamma is the rate of change of Delta. For options that are at-the-money, Gamma is typically at its peak. This means that as the underlying price moves, the Delta of these options will change more rapidly than those that are in or out-of-the-money. This can lead to larger position adjustments for traders trying to maintain a Delta-neutral strategy. <br /><br />
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2>Vega and Gamma</h2>
                        <p className="text-[#909090]">
                            When implied volatility is high, Gamma also tends to increase, especially for at-the-money options. This means that options can become more sensitive to changes in the underlying price as implied volatility increases. For traders, this can lead to larger potential profits, but also larger potential losses. <br /><br />
                        </p>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-1/2">
                        <h2>Delta, Gamma, and Theta</h2>
                        <p className="text-[#909090]">
                            As expiration approaches, both Gamma and Theta tend to increase for at-the-money options. This means that not only is the option&apos;s sensitivity to the underlying price (Delta) changing more rapidly (due to Gamma), but the option&apos;s value is also decaying faster (due to Theta). This can lead to more significant and rapid changes in the option&apos;s price, especially in the last week before expiration. <br /><br />
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2>Vega and Theta</h2>
                        <p className="text-[#909090]">
                            An increase in implied volatility (which would benefit those long on Vega) often comes with an increase in Theta (time decay). This is because options tend to be more expensive (and thus have more extrinsic value) when implied volatility is high. This extrinsic value decays over time, leading to a higher Theta. Traders need to weigh the potential benefits of an increase in implied volatility against the potential costs of increased time decay. <br /><br />
                        </p>
                    </div>
                </div>

                <ChapterQuiz user={user} 
                    question="What is one of the key interactions between Delta and Gamma?"
                    answer1="High Gamma can lead to larger position adjustments for traders trying to maintain a Delta-neutral strategy." 
                    answer2="Low Gamma will lead to higher Delta, and vice versa." 
                    answer3="Both Delta and Gamma being high can lead to slower time decay." 
                    correctAnswer="first" 
                    chapterNum={17} />
            </div>
        </div>
    )
}