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
                <h1 style={{ fontSize: "35px"}}>Understanding Moneyness</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> What moneyness means</li>
                        <li> In-the-Money (ITM) options</li>
                        <li> Out-of-the-Money (OTM) options</li>
                        <li>At-the-money (ATM) options</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What is Moneyness?</h2>
                <p className="text-[#909090]">
                    Moneyness is a term used in options trading that refers to the relationship between an option&apos;s price and the price of the underlying asset. <br /><br />

                    In essence, moneyness helps traders determine how close to being profitable an option is. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>In-the-Money (ITM) Options</h2>
                <p className="text-[#909090]">
                    An option is considered in-the-money when it can be exercised for a profit due to a difference between the option&apos;s strike price and the current market price of the underlying asset. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A call option is <strong>in-the-money</strong> when the option&apos;s strike price is lower than the current market price of the asset.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>A put option is in-the-money when the option&apos;s strike price is higher than the current market price of the asset.</p>
                </div>
                <p className="text-[#909090]">
                    The intrinsic value of an in-the-money option is equal to the difference between the strike price and the market price of the underlying asset. However, option premiums and fees must be taken into account to determine the overall profitability of the option. <br /><br />

                    Let&apos;s look at a practical example of an ITM option: <br /><br />

                    Suppose Bob bought a call option on ETH with a strike price of $1600 when ETH was trading at $1500. At expiration, the price of ETH has risen to $1700, making Bob&apos;s option in-the-money. He can exercise the option to buy ETH at a discount and immediately sell it for a profit, as long as the profit exceeds the premium and fees he paid for the option. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Out-of-the-Money (OTM) Options</h2>
                <p className="text-[#909090]">
                    An option is considered out-of-the-money when it has not reached its strike price and cannot be exercised for a profit. <br /> <br />

                    Exercising an OTM option will never result in a profit. However, there is a chance they could become in-the-money if strike price is reached before expiration, meaning they aren&apos;t worthless. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A call option is out-of-the-money when the option&apos;s strike price is higher than the current market price of the asset.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p>A put option is out-of-the-money when the option&apos;s strike price is lower than the current market price of the asset.</p>
                </div>
                <p className="text-[#909090]">
                    Let&apos;s look at a practical example of an OTM option: <br /><br />

                    Suppose Bob bought a call option on ETH with a strike price of $1700 when ETH was trading at $1500. At expiration, the price of ETH had only risen to $1600, making Bob&apos;s option out-of-the-money. He cannot exercise the option for a profit, and the premium and fees he paid for the option are lost. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>At-the-Money (ATM) Options</h2>
                <p className="text-[#909090]">
                    An option is considered at-the-money when its strike price is at or very near the current market price of the underlying asset. <br /><br />

                    At-the-money options have no intrinsic value and cannot be exercised for a profit. However, they may have extrinsic value depending on how much time is left before expiration. <br /><br />

                    For example, suppose an option has a strike price of $100 and the underlying asset is currently trading at $100. This option is at-the-money and currently has no intrinsic value. However, if there is enough time left before expiration and the price of the underlying asset changes, the option could become in-the-money and profitable. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Conclusion</h2>
                <p className="text-[#909090]">
                    Moneyness is an essential concept to understand when trading options, and goes hand-in-hand with intrinsic and extrinsic value. <br /><br />

                    In-the-money options are profitable and can be exercised for a profit, while out-of-the-money options cannot. <br /><br />

                    At-the-money options have no intrinsic value but may have extrinsic value depending on how much time is left before expiration. By understanding moneyness, traders can make informed decisions about which options to buy or sell.
                </p>
                <ChapterQuiz user={user} 
                    question="Can an in-the-money option always be exercised for a profit?" 
                    answer1="No. A trader must first consider the fees and premiums paid to determine whether or not an option is profitable." 
                    answer2="Yes, as long as the underlying asset is above the strike price." 
                    answer3="Obviously, an ITM option is always profitable." 
                    correctAnswer="first" 
                    chapterNum={12} />
            </div>
        </div>
    )
}