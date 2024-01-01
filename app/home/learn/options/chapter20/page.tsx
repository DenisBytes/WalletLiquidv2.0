"use server";
import ChapterExam from "@/app/ui/learn/options/ChapterExam"
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { auth } from "@/auth";
export default async function Page(){
    let user: User | undefined;
    const session = await auth();
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
    }

    return (
        <div className="flex justify-center w-full my-8" style={{fontFamily:"sans-serif", fontSize: "20px"}}>
            <div className="flex flex-col justify-center rounded-xl bg-[var(--components-background)] py-10 px-20 learn-div" >
                <h1 style={{ fontSize: "35px"}}>Exam: Advanced DeFi Options Concepts</h1>

                <ChapterExam
                    user={user}
                    chapterNum={20}
                    q1="1. What can volatility skew be useful for in DeFi options?"
                    q1a1="Volatility skew tells traders how much Theta is expected to change in the near-term."
                    q1a2="Volatility skew can be used to determine whether options or perps should be used for a given trade."
                    q1a3="Volatility skew can be used to identify under- or overpriced options based on implied volatility."
                    q1Correct="q1third"
                    q2="2. What does the option Delta represent?"
                    q2a1="The sensitivity of an option's Theta relative to underlying price action."
                    q2a2="The sensitivity of an option's price to a $1 change in the price of the underlying asset, serving as a proxy for the option's exposure to the underlying price."
                    q2a3="The likeliness of rapid near-term changes in implied volatility."
                    q2Correct="q2third"
                    q3="3. What does the concept of call-put parity help traders identify?"
                    q3a1="Call-put parity helps traders identify whether or not an asset is underpriced."
                    q3a2="Call-put parity helps traders identify profitable price differences between options with identical terms. In other words, arbitrage opportunities."
                    q3a3="Call-put parity helps traders choose between employing long calls or long puts."
                    q3Correct="q3second"
                    q4="4. What do traders generally need in order to capitalize on arbitrage opportunities?"
                    q4a1="Access to various exchanges, real-time market data, sufficient capital on each exchange, and very fast trade execution."
                    q4a2="Access to various exchanges, one price chart, and an API."
                    q4a3="Access to sufficient capital on various exchanges, insider information, and real-time market data."
                    q4Correct="q4first"
                />
            </div>
        </div>
    )
}