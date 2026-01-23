import React from 'react'
import { Session } from 'next-auth'
import { ReactNode } from 'react'
import Providers from '@/lib/providers'
import Header from '@/components/header'
import AppNavigation from '@/components/app-navigation'
import Footer from '@/components/footer'

const MobileRootContent = ({ children, session, dictionary }: { children: ReactNode, session: Session, dictionary: any }) => {
    return (
        <Providers session={session!}>
            <Header dictionary={dictionary} />
            {children}
            <Footer dictionary={dictionary} />
            <AppNavigation dictionary={dictionary} />
        </Providers>
    )
}

export default MobileRootContent
