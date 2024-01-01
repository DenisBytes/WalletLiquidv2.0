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
            <div className="flex flex-col justify-center rounded-xl bg-[var(--components-background)] py-10 px-20 learn-div">
                <h1 style={{ fontSize: "35px"}}>Exam: Intermediate DeFi Options Concepts</h1>

                <ChapterExam
                    user={user}
                    chapterNum={10}
                    q1="1. Which description matches that of Delta?"
                    q1a1="Greek that measures the rate of change in the option price relative to changes in the underlying asset price."
                    q1a2="Greek that measures the rate of time decay in an option's value."
                    q1a3="Greek that measures the sensitivity of an option's price relative to changes in implied volatility."
                    q1Correct="q1first"
                    q2="2. Does a call option with a high implied volatility have a higher chance of expiring ITM?"
                    q2a1="No. A high implied volatility has no correlation to an option's chance of expiring ITM."
                    q2a2="No, implied volatility has nothing to do with price action."
                    q2a3="Yes. Implied volatility directly correlates to an option's chance of expiring ITM. This is because a high implied volatility increases the likelihood of an option reaching strike price, as underlying asset price is more prone to movement."
                    q2Correct="q2third"
                    q3="3. Can an OTM option be exercised for a profit?"
                    q3a1="Sometimes, as long as the premium wasn't too high."
                    q3a2="No. OTM means out-of-the-money, and an OTM option cannot be exercised for a profit."
                    q3a3="Yes, as long as the difference between strike price and underlying asset price is great enough."
                    q3Correct="q3second"
                    q4="4. What measures the portion of an option's value that is derived from time left until expiration?"
                    q4a1="The premium."
                    q4a2="Intrinsic value."
                    q4a3="Extrinsic value (time value)."
                    q4Correct="q4third"
                />
            </div>
        </div>
    )
}