import { ReactNode } from "react";
import MobileRootContent from "../mobile-root-content";
import { handler } from "../../../auth";

export default async function MobileLayout({ children, dictionary }: { children: ReactNode; dictionary: any }) {
    const session = await handler.auth();
    return (
        <MobileRootContent session={session!} dictionary={dictionary}>
            {children}
        </MobileRootContent>
    );
}
