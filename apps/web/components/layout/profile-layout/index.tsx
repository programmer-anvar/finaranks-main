import React, { ReactNode } from 'react';
import Header from './customs/header';
import SearchBar from './customs/search-bar';
import { Card } from '@finranks/design-system/components/card';
import SideNav from './customs/side-nav';
import { cn } from '@finranks/design-system/lib/utils';
import FixedNav from './customs/mobile-nav';
import { getDictionary } from '@finranks/internationalization';

const ProfileLayout = async ({ children, isMobile }: { children: ReactNode; isMobile: boolean }) => {
    const dec = await getDictionary('en')
    return (
        <div className={cn("app-container pt-5 space-y-4", {
            "p-0!": isMobile,
        })}>
            {isMobile && <FixedNav />}
            <Header />
            <SearchBar />
            <div className='px-4 md:px-0'>
                <Card className={cn("rounded-md p-4 md:p-8 grid grid-cols-[72px_1fr] md:grid-cols-[250px_1fr] gap-4 py-0", {
                    "grid-cols-1": isMobile,
                })}>
                    {!isMobile && <SideNav dictionary={dec} />}
                    <div className='py-4'>
                        {children}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProfileLayout