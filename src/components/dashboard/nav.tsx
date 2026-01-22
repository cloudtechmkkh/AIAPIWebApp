import { currentUser } from "@clerk/nextjs/server";
import CreditDisplay from "./credit-display";
import Items from "./items";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function DashboardNav() {

    const user = await currentUser()

    return (
        <nav className="grid gap-2 items-start">
            <Items />

            <div>
                <CreditDisplay />
                {user && (
                    <Button asChild variant={'goocolor'}>
                        <Link href={'/dashboard/plan'} className="w-full text-white font-bold mt-3">アップグレード</Link>
                    </Button>
                )}
            </div>
        </nav>
    )
}
