import { headers } from 'next/headers';
import { getDeviceType } from '@/utils/get-device-type';
import { ReactNode } from 'react';
import MobileLayout from '../mobile';
import DesktopLayout from '../desktop';
import { getDictionary } from '@finranks/internationalization';

export default async function LayoutWrapper({ children }: { children: ReactNode }) {
    const dic = await getDictionary("en");
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;
    if (isMobile) {
        return <MobileLayout dictionary={dic}>{children}</MobileLayout>;
    }

    return <DesktopLayout dictionary={dic}>{children}</DesktopLayout>;
}
