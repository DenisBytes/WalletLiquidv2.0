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
                <h1 style={{ fontSize: "35px"}}>Exam: DeFi Options Basics</h1>

                <ChapterExam
                    user={user}
                    chapterNum={10}
                    q1="1. What's the biggest risk involved with short puts?"
                    q1a1="The underlying asset expiring above the strike price."
                    q1a2="Losing out on the option premiums."
                    q1a3="If the underlying asset falls in value the underwriter may have to buy the asset at the higher strike price, resulting in theoretically infinite downside."
                    q1Correct="q1third"
                    q2="2. How can investors earn yield from DeFi options without directly trading them?"         
                    q2a1="Depositing collateral on a lending platform."
                    q2a2="Selling options."
                    q2a3="Depositing to strategy vaults and/or options liquidity pools."
                    q2Correct="q2third"
                    q3="3. What are some of the most common use cases for DeFi options?"
                    q3a1="The only use case for options is directional trading"
                    q3a2="Hedging, speculation, and yield"
                    q3a3="Gambling and leverage"
                    q3Correct="q3second"
                    q4="4. When hedging risk by buying put options, what's the maximum loss that can occur for an investor?"
                    q4a1="The downside is theoretically infinite."
                    q4a2="Losing out on free alpha."
                    q4a3="The premiums paid for the options."
                    q4Correct="q4third"
                />
            </div>
        </div>
    )
}