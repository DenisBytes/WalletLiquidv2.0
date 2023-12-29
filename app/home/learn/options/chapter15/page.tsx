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
                <h1 style={{ fontSize: "35px"}}>Understanding Options: Key Definitions and Components</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> The components of options</li>
                        <li> Basic options terminology</li>
                        <li> Key definitions</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Understanding the Definitions and Components of Options</h2>
                <p className="text-[#909090]">Options are financial instruments that give the buyer the right, but not the obligation, to buy or sell an underlying asset at a specified price (the strike price) and date (expiration date).<br/><br/>

                    From the strike price to the premium, understanding the key components of an option is extremely important for using options successfully. <br/><br/>

                    In DeFi, the value of a financial derivative is generally derived from an asset or a group of assets, such as ETH or a liquidity pool.<br/><br/>

                    Starting with a recap of the two types of basic options, let&apos;s talk about the main components of options, including terms like the <strong>strike price</strong>, <strong>expiration date</strong>, and <strong>premium</strong>. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call Options</strong> give their buyer the right to <strong>buy</strong> the underlying asset at the specified strike price and expiration date. Call options are typically bought when the investor expects the price of the underlying asset to increase. Investors might also sell call options for profit while expecting prices to fall.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Put Options</strong> give their buyer the right to <strong>sell</strong> the underlying asset at the specified strike price and expiration date. Put options are typically bought when the investor expects the price of the underlying asset to decrease. Investors might also sell put options for profit while expecting prices to rise.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Strike Price</h2>
                <p className="text-[#909090]">
                    The <strong>strike price</strong> is the predetermined price at which an option gives its holder the right to buy (call option) or sell (put option) the underlying asset. <br/><br/>

                    The <strong>strike price</strong> is an essential component of an option, and is agreed upon by both the buyer and the seller when the option is created <br /><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call Options</strong> give their holder the right to <strong>buy</strong> an asset at the <strong>strike price</strong>.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Put Options</strong> give their holder the right to <strong>sell</strong> an asset at the <strong>strike price</strong>.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Expiration Date</h2>
                <p className="text-[#909090]">
                The <strong>expiration date</strong> is the last day an option can be exercised or traded. <br /><br/>

                After the expiration date, the option becomes worthless, and the buyer loses the right to buy or sell the underlying asset at the strike price. <br /><br/>
                
                Options can have various <strong>expiration dates</strong>, ranging from <strong>days</strong> to <strong>months</strong> or even <strong>years</strong>. In general, the longer the time until the expiration date, the more expensive the option premium will be. This is because the buyer has more time for an assets price to move in their favor. However, keep in mind that expiration date is only one of the factors impacting the price of an option. <br /><br/> 
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A call option with an <strong>expiration date</strong> that is <strong>one year from now </strong> is generally more expensive than a call option with an expiration date that is only one month from now.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Option Premium</h2>
                <p className="text-[#909090]">
                    The <strong>option premium</strong> is the price the buyer pays to acquire the option contract.<br/><br/>

                    The premium is determined by various factors, including the current market price of the underlying asset, the strike price, the time until expiration, and the implied volatility. <br /><br/>

                    Options with longer expiration dates or higher implied volatility generally have higher premiums. We&apos;ll go in-depth with implied volatility later in the course, so for now, think of it as a measure of how much the market expects the price of the underlying asset to move in the future. <br /><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>The premium</strong> for an option becomes more expensive as the likelihood of reaching the strike price increases.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Option Size</h2>
                <p className="text-[#909090]">
                    <strong>Option size</strong>, also known as position size, is the amount of assets that an option represents.<br/><br/>

                    In DeFi, the contract size is generally defined in terms of the asset, such as 0.1 ETH, 0.5 ETH, 1 ETH, and so on. <br /><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A call option on ETH with a <strong>contract size of 10 ETH</strong> gives you the right to <strong>buy 10 ETH</strong> at the strike price.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}> Key Takeaways</h2>
                <p className="text-[#909090]">
                Understanding the key components of options is essential for using them successfully. <br/><br/>

                By learning about the underlying asset, option type, strike price, expiration date, option premium, and option size, traders can make more informed decisions and better manage their risk. <br/><br/>

                Although options in DeFi have unique characteristics, they&apos;re also influenced by the same basic factors as in traditional finance. Options with longer expiration dates, higher implied volatility, and larger sizes generally have higher premiums. <br/><br/>

                In other words, the likelier an option is to make a profit for its buyer, the more expensive it is. <br/><br/>
                </p>
                <ChapterQuiz user={user} question="What is the Strike Price?" answer1="The price of an option." answer2="The price of an option." answer3="The price at which an option gives you the right to buy or sell the underlying asset." correctAnswer="third" chapterNum={3} />
            </div>
        </div>
    )
}   