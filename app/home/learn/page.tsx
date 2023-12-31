import { getOrCreateOptionsLearning, getOrCreateFuturesLearning } from "@/app/lib/actions"
import { getUser } from "@/app/lib/data"
import type { User, OptionsLearn } from "@/app/lib/definitions"
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

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

    return(
        <div className="w-full flex justify-center mt-4" style={{height: "80vh"}}>
            <div className="w-3/4">
                <div className="w-full flex justify-around mt-4">
                    <div id="futures" className="h-full w-1/3">
                        <div className="card">
                            <Image src="/cyberpunk1.jpg" className="rounded-t-lg" alt="futures" width={700} height={428} />
                            <h1 className="px-4 pt-4" style={{fontSize: "30px"}}>FUTURES 101</h1>
                            <div className="p-4">
                                <p className="text-[#909090]" style={{fontFamily:"sans-serif"}}>Futures trading simplifies crypto investment, offering contracts to buy or sell assets at set prices on specified dates, enabling speculation, hedging, and leveraging opportunities in crypto markets.</p>
                            </div>
                            <div className="w-full flex justify-center">
                                <Link href="/home/learn/futures/chapter1"className="course-button">BEGIN THE COURSE</Link>
                            </div>
                        </div>
                    </div>
                    <div id="options" className="h-full w-1/3">
                        <div className="card">
                            <Image src="/cyberpunk2.jpg" className="rounded-t-lg" alt="options" width={700} height={428} />
                            <h1 className="px-4 pt-4" style={{fontSize: "30px"}}>OPTIONS 101</h1>
                            <div className="p-4">
                                <p className="text-[#909090]" style={{fontFamily:"sans-serif"}}>Discover the basics of crypto options trading: Learn to hedge risk, speculate on price movements, and leverage flexibility in cryptocurrency markets through derivative contracts known as crypto options.</p>
                            </div>
                            <div className="w-full flex justify-center">
                                <Link href="/home/learn/options/chapter1" className="course-button">BEGIN THE COURSE</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}