import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { convertToReadable } from '@finranks/design-system/lib/utils';
import { get } from 'lodash';
import { memo } from 'react';

const StockDetails = memo(({ overview, dictionary }: any) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.stockDetailsCard || {};
    const na = dic.na || "N/A";

    const OVERVIEW_FACTS = [
        {
            label: dic.previousCloseLabel,
            value: get(overview, 'previousClose', na) ?? na,
        },
        {
            label: dic.dayRangeLabel,
            value: get(overview, 'dayRange', na) ?? na,
        },
        {
            label: dic.week52RangeLabel || "52-week range",
            value: get(overview, '52weekRange', na) ?? na,
        },
        {
            label: dic.volumeLabel,
            value: convertToReadable({ number: get(overview, 'volume', 0) ?? 0 }) ?? na,
        },
        {
            label: dic.averageVolumeLabel,
            value: convertToReadable({ number: get(overview, 'averageVolume', 0) }) ?? na,
        },
        {
            label: dic.betaLabel,
            value: get(overview, 'beta', na) ?? na,
        },
        {
            label: dic.epsTtmLabel,
            value: get(overview, 'EPSTTM', na) ?? na,
        },
        {
            label: dic.peRatioTtmLabel,
            value: get(overview, 'PEratioTTM', na) ?? na,
        },
        {
            label: dic.marketCapLabel,
            value: convertToReadable({ number: get(overview, 'marketCap', 0) }) ?? na,
        },
        {
            label: dic.sharesOutstandingLabel,
            value: convertToReadable({ number: get(overview, 'sharesOutstanding', 0) }) ?? na,
        },
        {
            label: dic.dividendYieldLabel,
            value: get(overview, 'dividendYield', na) ?? na,
        },
        {
            label: dic.nextEarningsDateLabel,
            value: get(overview, 'nextEarningsDate', na) ?? na,
        },
        {
            label: dic.sectorLabel,
            value: get(overview, 'sector', na) ?? na,
        },
        {
            label: dic.industryLabel,
            value: get(overview, 'industry', na) ?? na,
        },
    ];
    return (
        <Card className='space-y-4 rounded-[20px] p-4 md:p-6'>
            <Typography variant='h4'>{dic.stockDetailsTitle}</Typography>
            <dl className="space-y-2">
                {OVERVIEW_FACTS.map(({ label, value }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between border-b  border-[#ffffff33]"
                    >
                        <dt className="text-[14px] text-white">{label}</dt>
                        <dd className="font-semibold text-white text-right text-[14px]">{value}</dd>
                    </div>
                ))}
            </dl>
        </Card>
    )
})

export default StockDetails
