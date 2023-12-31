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
            <div className="flex flex-col justify-center rounded bg-[var(--components-background)] py-10 px-20 " style={{width: "65%",boxShadow:"var(--primary-color) 0px 2px 4px 0px, var(--primary-color) 0px 2px 16px 0px;"}}>
                <h1 style={{ fontSize: "35px"}}>Exam: Advanced DeFi Options Concepts</h1>

                <ChapterExam
                    user={user}
                    chapterNum={5}
                    q1="1. What are the two main types of basic options?"
                    q1a1="Straddles and spreads"
                    q1a2="Calls and puts"
                    q1a3="Long calls and short calls"
                    q1Correct="q1second"
                    q2="2. What do futures and options have in common?"                    
                    q2a1="They both cost a premium"
                    q2a2="They have identical risks"
                    q2a3="They are both financial derivatives"
                    q2Correct="q2third"
                    q3="3. What gives you the right, but not the obligation, to purchase an asset at a specific price and date?"
                    q3a1="A European-style call option"
                    q3a2="A futures contract"
                    q3a3="A put option"
                    q3Correct="q3first"
                    q4="4. What word is used to describe the price at which an option gives you the right to buy or sell the underlying asset?"
                    q4a1="Option price"
                    q4a2="Strike price"
                    q4a3="Extrinsic value"
                    q4Correct="q4second"
                />
            </div>
        </div>
    )
}