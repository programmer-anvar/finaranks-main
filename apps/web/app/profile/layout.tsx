import ProfileLayout from "@/components/layout/profile-layout";
import { getDeviceType } from "@/utils/get-device-type";
import { headers } from "next/headers";
import { ReactNode } from "react";

type RootLayoutProperties = {
    readonly children: ReactNode;
};


export default async function Layout({ children }: RootLayoutProperties) {
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;

    return (
        <ProfileLayout isMobile={isMobile}>{children}</ProfileLayout>
    );
}