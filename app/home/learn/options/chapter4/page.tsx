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
                <h1 style={{ fontSize: "35px"}}>European Options vs American Options</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 In this article, you will learn about:</h2>
                    <ul className="ml-6 sub-title">
                        <li>European-style options</li>
                        <li>American-style options</li>
                        <li>Exercise rules</li>
                        <li>The differences between European and American options</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>European and American Options</h2>
                <p className="text-[#909090]">
                    There are two main types of basic options: <strong>European</strong> and <strong>American</strong>. <br/><br/>

                    Although their basic functionalities are similar, there&apos;s one key difference: <strong>exercise rules</strong>. Let&apos;s talk about the exercise rules for both, along with key implications for traders and investors alike. <br/><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>European options</strong> are basic options that can only be exercised at the expiration date.</p>
                </div>
                <div className="colored-div2" style={{fontSize:"18px"}}>
                    <p><strong>American Options</strong> are basic options that can be exercised at any time before the expiration date.</p>
                </div>
                <p className="text-[#909090]">
                    Keep in mind that while options can be exercised after the expiration date, the exercise value will be locked at the time of expiration. If Bob has an ETH call with a strike price of $2,000, and ETH is valued at $2,100 at the time of expiration, Bob can exercise the option after the expiration date with an exercise value of $2,100. <br /><br/>
                </p>
                <h2 className="my-4" style={{fontSize: "30px"}}>Differences Between European and American Options</h2>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Exercise Rules:</strong> European options can only be exercised on the expiration date, while American options can be exercised at any time before or at the expiration date. This difference affects the strategies that investors and traders can use when utilizing these options.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Option Premium:</strong> American options generally have a higher premium than equivalent European options, as the ability to exercise the option at any time before expiration offers additional flexibility to the buyer. Additionally, American options in DeFi are often even heavier in fees due to their complexity.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Risk of Early Exercise:</strong>  American options expose the option seller to the risk of early exercise, which can impact their profits and strategies. European options do not carry this risk, as they can only be exercised at expiration.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Implications for Traders and Investors</h2>
                <p className="text-[#909090]">
                    The unique properties of European and American options make them useful for different purposes. Here are some common implications traders should consider when choosing options for different use cases: <br /><br/>
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>1. Hedging:</strong> European options may be more suitable for investors who need to hedge for a specific event or date, such as an announcement or a known economic event. American options can be more appropriate for investors who want the flexibility to manage their hedges dynamically, adjusting their positions as market conditions change.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>2. Income Generation:</strong> raders looking to generate income from options writing may prefer <strong>American</strong> options due to their higher premiums. However, they must also be prepared to manage the risk of early exercise.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>3. Speculation:</strong> Investors who want to speculate on the price movements of an underlying asset should consider the different exercise rules and premiums when choosing between <strong>European</strong> and <strong>American</strong> options, as these factors can impact the risk-reward profile of the trade.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Key Takeaways</h2>
                <p className="text-[#909090]">
                    The differences between <strong>European</strong> and <strong>American</strong> options are essential to understand. <br/><br/>

                    The distinction in exercise rules, option premiums, early exercise risk, and liquidity can impact the selection of an option type and trading strategy. <br/><br/>

                    Additionally, it&#39;s important to know what type of options you are buying or selling. Different DeFi options platforms might use different types of options. <br/><br/>
                </p>
                <ChapterQuiz user={user} question="Which description matches that of an European option?" answer1="Can be exercised for an added cost at any time" answer2="Can only be exercised at the expiration date" answer3="Can be exercised before the expiration date" correctAnswer="second" chapterNum={4} />
            </div>
        </div>
    )
}