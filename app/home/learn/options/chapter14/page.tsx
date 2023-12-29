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
                <h1 style={{ fontSize: "35px"}}>Introducing The Greeks</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> What &quot;The Greeks&quot; are</li>
                        <li> Delta, Gamma, Theta, Vega, and Rho</li>
                        <li> KHow Options Greeks are used</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What Are &quot;The Greeks&quot;?</h2>
                <p className="text-[#909090]">
                    <strong>The Greeks</strong> provide traders with valuable insights into the behavior and risk of options contracts. <br /><br />

                    They are a set of parameters that help quantify the sensitivity of an option&apos;s price to various factors such as changes in the underlying asset price, time decay, implied volatility, and interest rates. <br /><br />

                    There are five main options Greeks that traders commonly refer to: <strong>Delta</strong>, <strong>Gamma</strong>, <strong>Theta</strong>, <strong>Vega</strong>, and <strong>Rho</strong>. Each Greek represents a different aspect of an option&apos;s nature and plays a crucial role in understanding how options behave. <br /><br />

                    Let&apos;s begin with the most important and basic of the squadron: <strong>Delta</strong>. <br /><br />
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Delta</h2>
                <p className="text-[#909090]">
                    <strong>Delta</strong> measures the rate of change in the option price relative to changes in the underlying asset price. <br /><br />

                    Simply put, Delta tells us how much the option&apos;s value will change for a $1 move in the underlying asset price. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If a call option has a Delta of 0.6, it means that for every $1 movement in the underlying asset price, the option&apos;s price will move by approximately $0.60.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Gamma</h2>
                <p className="text-[#909090]">
                    <strong>Gamma</strong> measures the rate of change in an option&apos;s Delta relative to changes in the underlying asset price.<br /><br />

                    In essence, Gamma indicates how much Delta itself will change for a $1 increase in the underlying asset price. So, Delta gauges the sensitivity of an option&apos;s price, while Gamma gauges the sensitivity of Delta.
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>A higher Gamma means that the option&apos;s price becomes more sensitive to changes in the underlying asset price. If an option has a gamma of 0.08, it means that for every $1 increase in the underlying asset price, the option&apos;s delta will increase by 0.08.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Theta</h2>
                <p className="text-[#909090]">
                    <strong>Theta</strong> measures the rate of time decay in an option&apos;s value.<br /><br />

                    Along with Theta and the other Greeks, the concept of time decay will be covered more in-depth in Options Course 4: The Greeks. For now, all you need to know is that Theta gauges how much the price of an option will decrease as it moves closer to expiry. <br /><br />

                    This is because as time passes and an OTM option moves closer to it&apos;s expiration, the chances of the option expiring ITM become lower. The option becomes less valuable with time, assuming everything else stays equal. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If a call option has a Theta of -0.05, it means that the option&apos;s value will decrease by $0.05 per day due to time decay.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Vega</h2>
                <p className="text-[#909090]">
                    <strong>Vega</strong> measures the sensitivity of an option&apos;s price relative to changes in implied volatility.<br /><br />

                    Simply enough, Vega tells us how much the option&apos;s price will change for a 1% increase in implied volatility. <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If an option has a Vega of 0.10, it means that the option&apos;s price will increase by $0.10 for every 1% increase in implied volatility.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Rho</h2>
                <p className="text-[#909090]">
                    <strong>Rho</strong>  measures the sensitivity of an option&apos;s price to changes in interest rates. It indicates how much the option&apos;s price will change for a 1% change in interest rates.<br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>If a call option has a Rho of 0.04, it means that the option&apos;s price will increase by $0.04 for every 1% increase in interest rates.</p>
                </div>
                
                <h2 className="my-4" style={{fontSize: "30px"}}>In Summary</h2>
                <p className="text-[#909090]">
                    Options Greeks provide valuable insights into the behavior of options, and understanding them thoroughly is <em>crucial</em> to trading options successfully. Analyzing the interplay between Greeks can also prove to be highly beneficial, not to mention applying the lessons learned to understanding the overall markets. So, let&apos;s recap: <br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Delta</strong>measures the rate of change in the option price relative to changes in the underlying asset price.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Gamma</strong>measures the rate of change in an option&apos;s delta relative to changes in the underlying asset price.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Theta</strong> measures the rate of time decay in an option&apos;s value.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Vega</strong> measures the sensitivity of an option&apos;s price to changes in implied volatility.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Rho</strong> measures the sensitivity of an option&apos;s price to changes in interest rates.</p>
                </div>

                <ChapterQuiz user={user} question="What does Theta measure?" answer1="Theta measures how much an option's price will change according to a $1 change in the underlying asset price." answer2="Theta represents the sensitivity of Delta relative to the underlying asset price." answer3="Theta represents the sensitivity of Delta relative to the underlying asset price." correctAnswer="third" chapterNum={14} />
            </div>
        </div>
    )
}