import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@finranks/design-system/components/breadcrumb'
import { Home } from 'lucide-react';

const Header = ({ dictionary }: { dictionary?: any }) => {
    const headerDic = dictionary?.header;
    const commonDic = dictionary?.common;
    
    return (
        <div className='px-4 md:px-0'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="inline-flex items-center gap-1.5">
                            <Home size={16} strokeWidth={2} aria-hidden="true" />
                            {headerDic?.home}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                            {commonDic?.profile}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Header
