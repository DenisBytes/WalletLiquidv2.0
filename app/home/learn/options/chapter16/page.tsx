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
                <h1 style={{ fontSize: "35px"}}>Understanding Skew</h1>
                <div className="colored-div">
                    <h2 style={{fontSize: "30px"}}>💡 Advanced Options Concepts:</h2>
                    <p>This is where things get complicated, cadet. In this article, you&apos;ll learn about:</p>
                    <ul className="ml-6 sub-title">
                        <li> Skewness</li>
                        <li> Skew in statistics</li>
                        <li> Volatility skew in options</li>
                    </ul>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Introducing Skewness</h2>
                <p className="text-[#909090]">
                    <strong>Skewness</strong> can mean different things in different contexts.<br /><br />

                    In statistics, skewness is a measure that describes the asymmetry of a distribution around its mean. <br /><br />

                    In options, we&apos;re often referring to the &quot;volatility skew&qout;, which describes the variation in implied volatility across different strike prices. The volatility skew becomes especially useful when recognizing mispriced options based on volatility.<br /><br />
                </p>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Volatility Skew</strong>can be used to identify under- or overpriced options based on implied volatility.</p>
                </div>
                <h2 className="my-4" style={{fontSize: "30px"}}>Skew in Options</h2>
                <p className="text-[#909090]">
                    Volatility skew refers to the pattern where options on the same underlying asset with the same expiration date have different implied volatilities based on their strike prices. <br /><br />

                    First and foremost, let&apos;s take a trip down memory lane to illustrate what volatility skew is in practice. <br /><br />

                    <strong>Black Monday (1987):</strong> Before the market crash in 1987, implied volatilities were relatively flat across strikes. Post-crash, traders started pricing in a higher probability of catastrophic market declines, leading to higher implied volatilities for out-of-the-money (OTM) puts. <br /><br />

                    Now, there are multiple types of skew in options: smile, skew, and reverse skew. <br /><br />
                </p>
                <div className="flex justify-center">
                    <Image src="/smilesmirkskew.avif" alt="smilsmirkskew" width={700} height={428}/>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Smile :</strong> Implied volatility is higher for both deep OTM and deep in-the-money (ITM) options than it is for ATM options.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Skew (or Skewness):</strong> Implied volatility is different on one side of the ATM options than the other, typically higher for OTM puts than OTM calls.</p>
                </div>
                <div className="colored-div" style={{fontSize:"18px"}}>
                    <p><strong>Reverse Skew::</strong> Implied volatility is higher for OTM calls than for OTM puts.</p>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-1/2">
                        <h2>Importance of Understanding Skew</h2>
                        <ul className="text-[#909090]">
                            <li><strong>Pricing:</strong> Recognizing skew can help traders identify overpriced or underpriced options based on implied volatility.</li>
                            <li><strong>Risk Management:</strong> Skew can provide insights into market sentiment and potential tail risks.</li>
                            <li><strong>Hedging:</strong> Understanding skew is crucial for those looking to hedge portfolios, as the cost of hedging can vary based on the skew.</li>
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <h2>Factors Influencing <br /> Skew</h2>
                        <ul className="text-[#909090]">
                            <li><strong>Market Fear:</strong> A rush to buy OTM puts as a hedge can drive up their implied volatilities.</li>
                            <li><strong>Supply and Demand:</strong> Relative demand for certain strike prices can influence skew.</li>
                            <li><strong>Jump Risk:</strong> The market might price in the potential for sudden price movements.</li>
                        </ul>
                    </div>
                </div>

                <ChapterQuiz user={user} 
                    question="What is one of the primary implications of volatility skew in crypto options?"
                    answer1="Recognizing skew can help traders identify whether or not the implied volatility for an asset is accurate." 
                    answer2="Recognizing skew can help traders identify overpriced or underpriced options based on implied volatility." 
                    answer3="Volatility skew can only be used to identify overpriced options." 
                    correctAnswer="second" 
                    chapterNum={16} />
            </div>
        </div>
    )
}