import { BorderBeam } from '@finranks/design-system/components/border-beam';
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography';
import { describe } from 'node:test';




const Model = ({ dictionary }: { dictionary: any }) => {
    const mockStatistics = [
        {
            label: dictionary.dcfPeriod,
            value: dictionary.dcfPeriodValue,
            iconPath: '/icons/arrow-circle-right.svg',
        },
        {
            label: dictionary.discountRate,
            value: '12.79%',
            iconPath: '/icons/arrow-circle-right.svg',
        },
        {
            label: dictionary.perpetualGrowth,
            value: '3.00%',
            iconPath: '/icons/arrow-circle-right.svg',
        },
        {
            label: dictionary.revenueCagr,
            value: '14.00%',
            iconPath: '/icons/arrow-circle-right.svg',
        },
        {
            label: dictionary.fcfCagr,
            value: '5%',
            iconPath: '/icons/arrow-circle-right.svg',
        },
        {
            label: dictionary.calculatedFairValue,
            value: '353.69$',
            iconPath: '/icons/arrow-circle-right.svg',
            link: '/valuation/fair-value'
        },
        {
            label: dictionary.currentStockPrice,
            value: '412.23$',
            iconPath: '/icons/arrow-circle-right.svg',
        },
    ];
    return (
        <Card className='relative p-4 md:p-6 overflow-hidden'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>{dictionary.dcfModelTitle}</Typography>
            <Typography variant="small" color='secondary' className='text-[14px] md:text-inherit'>{dictionary.dcfModelDescription}</Typography>

            <ul className="flex flex-col gap-2 mt-7">
                {
                    mockStatistics.map((el) => {
                        return (<li className="home-card__statistic" key={el.value}>
                            <div className="flex items-center gap-2">
                                <div className="home-card__arrow">
                                    <img src="/icons/arrow-circle-right.svg" alt="" />
                                </div>
                                <span className='whitespace-nowrap'>{el.label}</span>
                            </div>
                            <div className="text-white font-bold ml-auto">{el.value}</div>
                        </li>)
                    })
                }
            </ul>
            <BorderBeam colorFrom="rgba(158, 61, 255, 0.70)"
                colorTo="rgba(158, 61, 255, 0.50)" borderWidth={1.8} duration={8} size={400} className="rounded-full" />
        </Card>
    )
}

export default Model