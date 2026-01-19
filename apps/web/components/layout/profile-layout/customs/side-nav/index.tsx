'use client';

import { useLogout } from '@/hooks/useLogout';
import { NAV_ITEMS } from '@/mocks/profile';
import { useConfirm } from '@finranks/design-system/components/confirm-dialog';
import { TooltipWrapper } from '@finranks/design-system/components/tooltip';
import { cn } from '@finranks/design-system/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNav = () => {
    const pathname = usePathname();
    const currentSlug = pathname.split('/')[2];
    const confirm = useConfirm();
    const { performLogout } = useLogout()

    const handleSignout = async () => {
        const result = await confirm({
            title: "Are you sure?",
            description: "Are you sure you want to logout?",
            confirmText: "Logout",
            confirmButton: {
                variant: "destructive",
            },
        });

        if (result.confirmed) {
            confirm.setLoading(true);
            await performLogout();
            confirm.setLoading(false);
            result.close();
        }
    };

    return (
        <nav className="flex flex-col border-r pr-4 py-4">
            {NAV_ITEMS.map(({ label, href, slug, icon }) => {
                const isActive = currentSlug === slug;

                return (
                    <TooltipWrapper content={label} classNames={{
                        content: "md:hidden"
                    }}>
                        <Link
                            key={slug}
                            href={href}
                            prefetch
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out',
                                'hover:bg-[#8b09d6f5]/10',
                                isActive && 'bg-[#8b09d6f5]/10 text-white'
                            )}
                        >
                            <div className="w-8 h-8  flex items-center justify-center bg-[#8b09d6f5] rounded-md mr-2.5 shrink-0">
                                <img src={icon} alt="" />
                            </div>

                            <span className="text-sm hidden md:block font-medium">{label}</span>
                        </Link>
                    </TooltipWrapper>
                );
            })}

            {/* Logout */}
            <TooltipWrapper content={"Logout"} classNames={{
                content: "md:hidden"
            }}>
                <Link
                    href="#"
                    className="flex items-center p-3 mt-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#8b09d6f5]/10"
                    onClick={handleSignout}
                >
                    <div className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-md mr-2.5 shrink-0">
                        <img src="/icons/logout.svg" alt="" width={18} />
                    </div>
                    <span className="text-sm font-medium hidden md:block">Logout</span>
                </Link>
            </TooltipWrapper>
        </nav>
    );
};

export default SideNav;
