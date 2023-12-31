import { getOrCreateOptionsLearning, getOrCreateFuturesLearning } from "@/app/lib/actions"
import { getUser } from "@/app/lib/data"
import type { User, OptionsLearn } from "@/app/lib/definitions"
import { auth } from "@/auth";
import Link from "next/link";

export default async function OptionSideNav() {

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
            "DERIVATIVES",
            "OPTIONS: KEY DEFINITIONS AND COMPONENTS",
            "EUROPEAN OPTIONS VS AMERICAN OPTIONS",
            "EXAM: INTRODUCTION TO DEFI OPTIONS",
            "USE CASES FOR DEFI OPTIONS",
            "CALL OPTIONS BASICS",
            "PUT OPTIONS BASICS",
            "DEFI OPTIONS IN PRACTICE",
            "EXAM: DEFI OPTIONS BASICS",
            "IMPLIED AND REALIZED VOLATILITY",
            "MONEYNESS",
            "INTRINSIC AND EXTRINSIC VALUE",
            "INTRODUCING THE GREEKS",
            "EXAM: INTERMEDIATE DEFI OPTIONS CONCEPTS",
            "SKEW",
            "THE GREEKS",
            "CALL-PUT PARITY",
            "OPTIONS ARBITRAGE",
            "EXAM: ADVANCED DEFI OPTIONS CONCEPTS"
        ];        
    
        return chapterNames[chapterNum - 1] || `Chapter ${chapterNum}`;
    }

    return (
        <div className="p-4 w-1/4 h-[85vh] sticky top-24 rounded overflow-y-scroll overflow-y-[var(--primary-color)]">
            <p className="text-2xl py-4">OPTIONS 101</p>
            <div className="chapters">
                {/* Display chapter names and corresponding tick or cross */}
                {Array.from({ length: 20 }, (_, i) => i + 1).map((chapterNum) => (
                    <Link href={`/home/learn/options/chapter${chapterNum}`} key={`chapter${chapterNum}`} style={{fontFamily: "sans-serif", fontSize: "15px"}} className=" px-4 py-2 flex flex-col">
                        <div>
                            {chaptersDone[`chapter${chapterNum}`] ? (
                                <span className="tick">✅</span>
                            ) : (
                                <span className="cross">❌</span>
                            )}
                            <span>{`${chapterNum}. ${
                                getChapterName(chapterNum)
                            }`}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}