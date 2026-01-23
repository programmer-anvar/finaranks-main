import React, { ReactNode } from 'react';
import Header from './customs/header';
import SearchBar from './customs/search-bar';
import { Card } from '@finranks/design-system/components/card';
import SideNav from './customs/side-nav';
import { cn } from '@finranks/design-system/lib/utils';
import FixedNav from './customs/mobile-nav';

const ProfileLayout = ({ children, isMobile, dictionary }: { children: ReactNode; isMobile: boolean; dictionary: any }) => {
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
                    {!isMobile && <SideNav dictionary={dictionary} />}
                    <div className='py-4'>
                        {children}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProfileLayout
