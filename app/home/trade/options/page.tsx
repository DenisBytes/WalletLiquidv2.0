import { getUser } from "@/app/lib/data";
import type { User } from "@/app/lib/definitions"
import OptionsPage from "@/app/ui/trade/OptionsPage";
import { auth } from "@/auth"
export default async function Page() {
    let user : User | undefined;
    const session = await auth();
    if (session!==null && session.user !== undefined) {
        user = await getUser(session.user.email);
    }
    
    return (
        <div>
            <OptionsPage user={user}/>
        </div>
    )
}