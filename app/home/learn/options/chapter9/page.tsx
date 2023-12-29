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
                <h1 style={{ fontSize: "35px"}}>DeFi Options in Practice</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> Price speculation with options</li>
                        <li> Hedging with options</li>
                        <li> Earning yield with options</li>
                        <li> Implementing strategies with options</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Options Recap</h2>
                <p className="text-[#909090]">
                    <strong>Options</strong> are financial derivatives that can give their holder the <strong>right</strong> to <strong>buy</strong> or <strong>sell</strong> an underlying asset at a specified strike price and expiration date. <br /><br />

                    They can be a useful tool for investors looking to <strong>speculate</strong> on price movements, <strong>hedge</strong> against potential losses, <strong>generate</strong> income, or implement trading <strong>strategies</strong>. <br /><br />

                    Let&apos;s go in-depth with some of the practical applications and outcomes of using options. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Speculation</h2>
                <p className="text-[#909090]">
                    <strong>Long call</strong> and <strong>long put</strong> positions can be used to speculate on the future price movements of an asset. <br /><br />

                    This can be a useful tool for investors who have conviction on a direction that the price of an asset like ETH will take in the future. For example, let&apos;s say an investor believes that the price of ETH will increase in the next three months. They can enter a <strong>long call</strong> position by buying ETH calls that expire in three months. <br /><br />

                    If the price of ETH does indeed increase, the investor can exercise the option and make a profit. However, if the price of ETH remains the same or decreases, the investor may choose to let the option expire, in which case they would only lose the cost of the premium.
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Long call:</strong> If the price of ETH <strong>increases</strong> above the strike price, the investor can exercise the option and make a <strong>profit</strong>.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Long call:</strong> If the price of ETH remains the same or decreases, the investor can choose to let the option expire and only lose the cost of the premium.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Hedging</h2>
                <p className="text-[#909090]">
                    <strong>Options</strong> can be used to <strong>hedge</strong> against potential <strong>losses</strong> in current positions. <br /><br />

                    For example, let&apos;s say an investor owns 10 ETH and is concerned that the price may decrease in the future. They can purchase an ETH put option with a strike price equal to the current market price of ETH. If the price of ETH does indeed decrease, the investor can exercise the option and sell ETH at the higher strike price, mitigating their losses. However, if the price of ETH increases, the investor may choose to let the option expire, in which case they would only lose the cost of the premium. <br /><br />

                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Hedging:</strong> If the price of ETH <strong>decreases</strong>, the investor can exercise the option and <strong>mitigate</strong> their losses.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Hedging:</strong> If the price of ETH <strong>increases</strong>, the investor will <strong>profit</strong> from his holdings, and only lose out on the premium paid for the option.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Yield</h2>
                <p className="text-[#909090]">
                    Investors can directly generate income from options by underwriting (selling) them. <br /><br />

                    This can be a useful tool for investors who own ETH, don&apos;t expect the price to increase significantly, and want to earn yield on their holdings. <br /><br />

                    For example, let&apos;s say an investor owns 10 ETH and expects the price to stagnate. They can sell an ETH call option with a strike price above the current market price of ETH. If the price of ETH does not increase above the strike price, the investor can keep the premium collected. However, if the price of ETH increases above the strike price, the investor may be obligated to sell the ETH at the lower strike price, resulting in a loss. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Underwriting Call Options:</strong> If the price of ETH <strong>doesn&apos;t</strong> increase above the strike price, the investor <strong>profits</strong> the premiums collected.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>Underwriting Call Options:</strong> If the price of ETH increases above the strike price, the investor may be obligated to <strong>sell</strong> the ETH at the lower strike price, resulting in a <strong>loss</strong>.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Strategies</h2>
                <p className="text-[#909090]">
                    <strong>Options</strong> can be used in a multitude of strategies for different purposes. <br /><br />

                    For example, an investor can combine different positions to create strategies with varying levels of risks and rewards. One commonly used options strategy is the <strong>call spread</strong>, where an investor <strong>purchases</strong> an ETH <strong>call</strong> option with a lower strike price and <strong>sells</strong> an ETH <strong>call</strong> option with a higher strike price. This strategy limits potential losses while still allowing potential for profit. <br /><br />

                    Another common strategy is the <strong>covered call</strong>, where an investor <strong>owns</strong> ETH and <strong>sells</strong> an ETH <strong>call</strong> option with a strike price above the current market price of ETH. This strategy can generate income from the premiums collected but also limits potential gains if the price of ETH increases significantly.  <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Call Spread:</strong>  Limits potential losses while still allowing for potential gains.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Covered Calls:</strong>  Generates income from premiums collected but limits potential gains if the price of ETH increases significantly.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}> Key Takeaways</h2>
                <p className="text-[#909090]">
                    It&apos;s important to note that call options are complex financial instruments and involve significant risks. <br /><br />

                    In conclusion, <strong>options</strong> can be a useful tool for investors looking to <strong>speculate</strong> on price movements, <strong>hedge</strong> against potential losses, <strong>generate</strong> income, or implement trading <strong>strategies</strong>. <br /><br />

                    Each practical application of options has its own potential outcomes, and it&apos;s important for investors to fully understand these outcomes before implementing any strategy. As with any investment, it&apos;s important to do your own research and understand what you&apos;re getting into. <br /><br />
                </p>
                <ChapterQuiz user={user} question="What is the covered calls strategy based on?" answer1="Buying and selling a call simultaneously." answer2="Reducing risk by buying put options as a hedge." answer3="Underwriting call options for assets you already hold to generate a profit." correctAnswer="third" chapterNum={9} />
            </div>
        </div>
    )
}