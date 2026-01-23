import { Typography } from '@finranks/design-system/components/typography'
import MajorHolders from './customs/major-holders'
import { getHolders } from '@/services/stock-holders';
import TopHolders from './customs/top-holders';
import MutalFundHolders from './customs/mutal-fund-holders';

const OwnerShipPage = async ({ params, dictionary }: { params: any; dictionary?: any }) => {
    const { slug } = await params;
    const { data } = await getHolders(slug);
    const dic = dictionary?.stock?.stockMain?.ownershipTab;
    return (
        <div className='space-y-4'>
            <Typography variant="h2" className="text-[24px]!" weight="semibold">{dic?.ownershipTitle || "Ownership"}</Typography>
            <MajorHolders data={data} dictionary={dictionary} />
            <TopHolders data={data} dictionary={dictionary} />
            <MutalFundHolders data={data} dictionary={dictionary} />
        </div>
    )
}

export default OwnerShipPage