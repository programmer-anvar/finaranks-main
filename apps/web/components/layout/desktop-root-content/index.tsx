import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/lib/providers'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

const DesktopRootContent = ({ children, session, dictionary }: { children: ReactNode, session: Session, dictionary: any }) => {
    return (
        <Providers session={session!} dictionary={dictionary}>
            <Header dictionary={dictionary} />
            {children}
            <Footer dictionary={dictionary} />
        </Providers>
    )
}

export default DesktopRootContent
