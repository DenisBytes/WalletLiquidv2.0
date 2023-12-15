import FuturesPage from "@/app/ui/trade/FuturesPage";
import type { User, FuturesOrder } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { getUser, getFuturesOrders } from "@/app/lib/data";

export default async function Page() {
    let user: User | undefined;
    const session = await auth();
    let futuresOrders: FuturesOrder[][] | undefined;
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
        futuresOrders = await getFuturesOrders(user?.id);
    }
    return (
        <FuturesPage user={user} futuresOrders={futuresOrders}/>
    )
}