import { getOrCreateOptionsLearning, getOrCreateFuturesLearning } from "@/app/lib/actions"
import { getUser } from "@/app/lib/data"
import type { User, OptionsLearn } from "@/app/lib/definitions"
import { auth } from "@/auth";
import Link from "next/link";
export default async function Page(){
    let user: User | undefined;
    const session = await auth();
    let optionsLearning;
    let chaptersDone: { [key: string]: boolean } = {};

    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
        optionsLearning = await getOrCreateOptionsLearning(user?.id);
        for (let i = 1; i <= 20; i++) {
            const propertyName = `chapter${i}`;
            const isDone = optionsLearning !== undefined ? optionsLearning[propertyName] : false;
            chaptersDone[`chapter${i}`] = isDone;
        }
    }
    function getChapterName(chapterNum: number) {
        const chapterNames = [
            "WHAT ARE OPTIONS?",
            "UNDERSTANDING DERIVATIVES",
            "UNDERSTANDING OPTIONS: KEY DEFINITIONS AND COMPONENTS",
            "EUROPEAN OPTIONS VS AMERICAN OPTIONS",
            "EXAM: INTRODUCTION TO DEFI OPTIONS",
            "USE CASES FOR DEFI OPTIONS",
            "CALL OPTIONS BASICS",
            "PUT OPTIONS BASICS",
            "DEFI OPTIONS IN PRACTICE",
            "EXAM: DEFI OPTIONS BASICS",
            "IMPLIED AND REALIZED VOLATILITY",
            "UNDERSTANDING MONEYNESS",
            "INTRINSIC AND EXTRINSIC VALUE",
            "INTRODUCING THE GREEKS",
            "EXAM: INTERMEDIATE DEFI OPTIONS CONCEPTS",
            "UNDERSTANDING SKEW",
            "UNDERSTANDING THE GREEKS",
            "CALL-PUT PARITY",
            "OPTIONS ARBITRAGE",
            "EXAM: ADVANCED DEFI OPTIONS CONCEPTS"
        ];        
    
        return chapterNames[chapterNum - 1] || `Chapter ${chapterNum}`;
    }
    

    return(
        <div className="flex justify-center" style={{height: "80vh"}}>
            <div className="flex justify-between w-8/12 mt-4">
                <div id="futures" className="h-full w-1/2">

                </div>
                <div id="options" className="h-full w-1/2">
                    <div className="card">
                        <div className="w-full flex justify-center my-6">
                            <h1 style={{fontSize: "30px"}}>OPTIONS COURSE</h1>
                        </div>
                        <div className="progress">
                            <div className="circle">
                                {/* Calculate percentage of completed chapters */}
                                {optionsLearning && (
                                    <span>{`${Object.values(chaptersDone).filter(done => done).length * 5}%`}</span>
                                )}
                            </div>
                        </div>
                        <div className="chapters">
                            {/* Display chapter names and corresponding tick or cross */}
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((chapterNum) => (
                                <Link href={`/home/learn/options/chapter${chapterNum}`} key={`chapter${chapterNum}`} className="border border-y-0 border-x-0 p-4 border-b-4 border-b-[var(--primary-color)]">
                                    {chaptersDone[`chapter${chapterNum}`] ? (
                                        <span className="tick">✅</span>
                                    ) : (
                                        <span className="cross">❌</span>
                                    )}
                                    <span>{`${chapterNum}. ${
                                        getChapterName(chapterNum)
                                    }`}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}