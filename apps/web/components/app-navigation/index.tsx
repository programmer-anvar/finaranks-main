"use client"
import styles from "./customs/navigation-link/app-navigation.module.css";
import AppNavigationLink from "./customs/navigation-link";

const AppNavigation = ({ dictionary }: { dictionary?: any }) => {
    const dic = dictionary?.navigation;
    
    const links = [
        {
            href: '/search',
            label: dic?.search,
            src: 'search2.svg'
        },
        {
            href: '/news',
            label: dic?.news,
            src: 'news.svg'
        },
        {
            href: '/profile',
            label: dic?.profile,
            src: 'user.svg'
        },
        {
            href: '/screener',
            label: dic?.screener,
            src: 'screener.svg'
        },
    ];

    return (
        <div>
            <ul className={"fixed bottom-0 left-0 z-50 w-full grid grid-cols-4 bg-[#0b0324]"}>
                {
                    links.map((link) => (
                        <li
                            className="flex flex-col items-center"
                            key={link.href}>
                            <AppNavigationLink href={link.href}>
                                <img src={`/footer-icons/${link.src}`} alt="" />
                                <span className="text-xs">{link.label}</span>
                            </AppNavigationLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AppNavigation
