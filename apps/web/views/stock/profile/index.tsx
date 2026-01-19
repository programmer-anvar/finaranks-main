import { getFillings, getProfileData } from '@/services/profile';
import About from './customs/about'
import { get } from 'lodash';
import KeyExecutives from './customs/key-executives';
import Widgets from './customs/widgets';
import SecFilings from './customs/sec-fillings';
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';

const ProfilePage = async ({ params }: { params: any }) => {
    const { slug } = await params;
    const { data } = await getProfileData(slug);
    const { data: fillings } = await getFillings(slug);
    const description = get(data, 'info.data.description');
    const officers = get(data, 'officers.data', []);

    const name = get(data, 'info.data.name')
    const country = get(data, 'info.data.country')
    const industry = get(data, 'overview.data.industry')
    const sector = get(data, 'overview.data.sector')
    const ipoDate = get(data, 'info.data.ipoDate')
    const ceo = get(data, 'info.data.ceo')

    const address = get(data, 'info.data.address')
    const phone = get(data, 'info.data.phone')
    const website = get(data, 'info.data.website')

    const symbol = get(data, 'stock.data.symbol')
    const exchange = get(data, 'stock.data.exchange')
    const fiscal_year = get(data, 'stock.data.fiscal_year')
    const reporting_currency = get(data, 'stock.data.reporting_currency')
    const cik_code = get(data, 'stock.data.cik_code')
    const cusip_number = get(data, 'stock.data.cusip_number')
    const isin_number = get(data, 'stock.data.isin_number')
    const employer_id = get(data, 'stock.data.employer_id')
    const sic_code = get(data, 'stock.data.sic_code')

    const widgets = {
        name,
        country,
        industry,
        sector,
        ipoDate,
        ceo,
        address,
        phone,
        website,
        symbol,
        exchange,
        fiscal_year,
        reporting_currency,
        cik_code,
        cusip_number,
        isin_number,
        employer_id,
        sic_code,
    }
    const show = (v: any) =>
        v === undefined || v === null || String(v).trim() === '' ? 'N/A' : v

    const hasAnyWidgetValue =
        Object.values(widgets).some((v) => v !== undefined && v !== null && String(v).trim() !== '')

    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4'>
                <Card className="p-6 rounded-xl space-y-4 h-[300px] block md:hidden">
                    <Typography variant="h2" className="text-[20px]!" weight="semibold">
                        {show(widgets.name)}
                    </Typography>

                    {!hasAnyWidgetValue ? (
                        <div className="text-sm text-muted-foreground h-full w-full flex items-center justify-center">No Data Found</div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-white text-sm">Country</span>
                                <span className="text-white text-sm font-semibold">
                                    {show(widgets.country)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-white text-sm">Industry</span>
                                <span className="text-white text-sm font-semibold">
                                    {show(widgets.industry)}
                                </span>
                            </div>


                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-white text-sm">Sector</span>
                                <span className="text-white text-sm font-semibold">
                                    {show(widgets.sector)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-white text-sm">IPO Date</span>
                                <span className="text-white text-sm font-semibold">
                                    {show(widgets.ipoDate)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-white text-sm">CEO</span>
                                <span className="text-white text-sm font-semibold">
                                    {show(widgets.ceo)}
                                </span>
                            </div>
                        </div>
                    )}
                </Card>
                <div className='space-y-4'>
                    <About description={description} />
                    <KeyExecutives data={officers} />
                </div>
                <div>
                    <Widgets data={widgets} />
                </div>
            </div>
            <SecFilings data={fillings} />
        </div>
    )
}

export default ProfilePage
