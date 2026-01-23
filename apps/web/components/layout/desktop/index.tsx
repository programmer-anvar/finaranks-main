import { ReactNode } from "react";
import DesktopRootContent from "../desktop-root-content";
import { handler } from "../../../auth";


export default async function DesktopLayout({ children, dictionary }: { children: ReactNode; dictionary: any }) {
    const session = await handler.auth();
    return (
        <DesktopRootContent session={session!} dictionary={dictionary}>
            {children}
        </DesktopRootContent>
    );
}
