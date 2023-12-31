import ChapterQuiz from "@/app/ui/learn/options/ChapterQuiz";
import { auth } from "@/auth";
import type { User } from "@/app/lib/definitions";
import { getUser } from "@/app/lib/data";

export default async function Page() {
    let user: User | undefined;
    const session = await auth();
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
    }
    return (
        <div className="flex justify-center w-full my-8" style={{fontFamily:"sans-serif", fontSize: "20px"}}>
            <div className="flex flex-col justify-center rounded-xl  bg-[var(--components-background)] py-10 px-20 " style={{width: "65%",boxShadow:"var(--primary-color) 0px 2px 4px 0px, var(--primary-color) 0px 2px 16px 0px"}}>
                <h1 style={{ fontSize: "35px"}}>WHAT ARE OPTIONS ?</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li> Options</li>
                        <li> Call and Put options</li>
                        <li> What DeFi options are used for</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Understanding Options</h2>
                <p className="text-[#909090]">Options are a type of financial derivative that give their buyer the right, but not the obligation, to buy or sell an asset like ETH at a certain time and price. <br/><br/>

                    For example, an option could give you the right to buy 1 ETH at a price of $2,000 next Sunday.<br/><br/>

                    There are two main types of options: <strong>call options</strong> and <strong>put options.</strong><br/><br/>

                    Investors typically buy call options when they anticipate prices to rise, and put options when they anticipate prices to fall.<br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Call Options:</strong> Call options grant their holder the right to buy an asset at a specified price and date.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>2. Put Options:</strong> Put options grant their holder the right to sell an asset at a specified price and date.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Call Options</h2>
                <p className="text-[#909090]">
                    <strong>A call option</strong> is similar to reserving a table at a popular restaurant.<br/><br/>
                    You call ahead and pay a fee to the restaurant to reserve a table for a specific date and time. This way, you secure a spot at the restaurant and can enjoy a nice meal, but you&apos;re not obligated to show up if something comes up. <br/><br/>
                    If you do show up, you have the option to order from the menu and pay the listed prices. But if you don&apos;t show up, the restaurant keeps the reservation fee you paid. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>Buying a <strong>call option</strong>is similar to paying upfront for a table at a restaurant, since even though you&apos;ve secured the table, you only lose what you paid for the reservation if you decide not to go.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Put Options</h2>
                <p className="text-[#909090]">
                    <strong>A put option</strong> is like having a home insurance policy.<br/><br/>
                    When you buy a home insurance policy, you pay a premium to the insurance company to protect your home from potential damage or loss. If your home is damaged or destroyed, you can file a claim and the insurance company will pay out the agreed-upon amount to cover your losses.<br/><br/>
                    If nothing happens to your home, you&apos;ll still lose what you paid for the insurance, but you can sleep well knowing you&apos;re protected. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p>Buying a <strong>put option</strong>is similar to paying upfront for insurance, since you&apos;re protected if something happens to your house.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>What Are Options Useful For?</h2>
                <p className="text-[#909090]">
                    <strong>Options</strong> are inherently flexible and cheap in comparison to simply buying or selling assets, and their unique properties unlock multiple avenues of utilization. <br/><br/>
                    Let&apos;s talk about the most common use cases for options: <strong>leverage</strong>, <strong>risk management</strong>, <strong>earning yield</strong>, and <strong>speculating</strong>. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Leverage:</strong> Options allow traders to control a larger amount of an asset with a relatively small initial investment, potentially amplifying gains but also increasing potential loss.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Risk Management:</strong> Options can be used to provide some protection to your existing holdings and positions without having to sell your assets.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Income Generation: </strong> Investors can use different options strategies to generate additional income from their existing holdings. In DeFi, users can deposit into strategy vaults or liquidity pools to earn income from options without directly trading them.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>4. Speculation:</strong> Options can be used to speculate on the price of an asset and its potential price range.Traders can use options to speculate on the future price movements of the underlying asset, potentially profiting from both upward and downward market movements.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Key Takeaways</h2>
                <p className="text-[#909090]">Options are the most versatile and flexible tool for investing.<br/><br/>
                    By understanding the fundamentals of options thoroughly, traders can gain a powerful weapon for their portfolio. <br/><br/>
                </p>
                <ChapterQuiz user = {user} 
                    question="What are the two main types of basic options?" 
                    answer1="Long calls and short calls" 
                    answer2="Calls and puts" 
                    answer3="Straddles and spreads" 
                    correctAnswer="second" 
                    chapterNum={1} />
            </div>
        </div>
    )
}