"use client"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@finranks/design-system/components/drawer'
import { useModals } from '@/stores/modal'
import { Button } from '@finranks/design-system/components/Button'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { Separator } from '@finranks/design-system/components/separator'
import { Typography } from '@finranks/design-system/components/typography'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/mocks/profile'
import Link from 'next/link'
import { useLogout } from '@/hooks/useLogout'
import { useConfirm } from '@finranks/design-system/components/confirm-dialog'

const FixedNav = ({ dictionary }: { dictionary: any }) => {
    const { profileMobileNav, setModal } = useModals()
    const pathname = usePathname();
    const currentPathSlug = pathname.split('/')[2];
    
    const sideBar = dictionary?.profilePage?.profilePageBody?.sideBar;
    const commonDic = dictionary?.common;
    
    const currentPage = NAV_ITEMS.find(item => item?.slug === currentPathSlug);
    const currentPageLabel = currentPage ? sideBar?.[currentPage.label] : sideBar?.profile;


    const { performLogout } = useLogout()
    const confirm = useConfirm()

    const handleSignout = async () => {
        const result = await confirm({
            title: commonDic?.areYouSure,
            description: commonDic?.areYouSureLogout,
            confirmText: sideBar?.logout,
            confirmButton: {
                variant: "destructive",
            },
        });

        if (result.confirmed) {
            confirm.setLoading(true);
            await performLogout();
            confirm.setLoading(false);
            result.close();
            setModal({ profileMobileNav: false })
        }
    };

    return (
        <>
            <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[#12092c]">
                <Button hasIconOnly iconDescription={commonDic?.back} variant='ghost' onClick={() => setModal({ profileMobileNav: false })}>
                    <ArrowLeft />
                </Button>
                <Typography variant="body" className='text-lg! font-semibold'>{currentPageLabel}</Typography>
                <Button hasIconOnly iconDescription={commonDic?.menu} onClick={() => setModal({ profileMobileNav: true })}>
                    <Menu />
                </Button>
            </div>
            <Drawer
                open={profileMobileNav}
                snapPoints={[]}
                onOpenChange={() => setModal({ profileMobileNav: false })}
                direction="right"
            >
                <DrawerContent className="shadow-xl data-[vaul-drawer-direction=right]:w-[320px] bg-[#0b0324] border-l border-[#12092c]">
                    <DrawerHeader className="relative">
                        <DrawerTitle>{commonDic?.menu}</DrawerTitle>
                        <DrawerClose className="absolute top-3 right-5">
                            <Button
                                size="sm"
                                variant="ghost"
                                hasIconOnly
                                iconDescription={commonDic?.close}
                            >
                                <X />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <Separator />
                    <div className="scrollable space-y-6 overflow-y-auto px-0 pb-24">
                        <div className="mobile-profile__menu-items">
                            {NAV_ITEMS.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`mobile-profile__menu-item hover:bg-[#8b09d6f5]/10 ${item.slug === currentPathSlug ? 'active' : ''}`}
                                    onClick={() => setModal({ profileMobileNav: false })}
                                >
                                    <img src={item.icon} alt={sideBar?.[item.label]} width={20} />
                                    <span>{sideBar?.[item.label]}</span>
                                </Link>
                            ))}
                            <Link
                                href="#"
                                className="mobile-profile__menu-item mobile-profile__menu-item--logout hover:bg-[#8b09d6f5]/10 "
                                onClick={() => handleSignout()}
                            >
                                <img src="/icons/logout.svg" alt={sideBar?.logout} width={18} />
                                <span>{sideBar?.logout}</span>
                            </Link>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FixedNav
