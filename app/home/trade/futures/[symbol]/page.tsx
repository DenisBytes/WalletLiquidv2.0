import FuturesPage from "@/app/ui/trade/FuturesPage";
import type { User, FuturesOrder } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { getUser, getFuturesOrders } from "@/app/lib/data";
import { updateLastLogin } from "@/app/lib/actions";

export default async function Page() {
    let user: User | undefined;
    const session = await auth();
    await updateLastLogin(session?.user?.id);
    
    let futuresOrders;
    
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
        futuresOrders = await getFuturesOrders(user?.id);
    }
    return (
        <FuturesPage user={user} futuresOrders={futuresOrders}/>
    )
}