"use client"
import { Card } from '@finranks/design-system/components/card'
import { get } from 'lodash'

interface DividendYieldCardProps {
    data: any;
    dictionary?: any;
}

const DividendYieldCard = ({ data, dictionary }: DividendYieldCardProps) => {
    const dic = dictionary?.stock?.stockMain?.dividendsTab;
    
    return (
        <Card className='p-5 md:p-6 rounded-xl'>
            <div className='main-box space-y-4'>
                <div className='flex flex-col'>
                    <div className='text-sm'>{dic?.yearsDividendIncreaseLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.years_of_growth.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>{dic?.exDividendDateLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.ex_dividend_date.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>{dic?.dividendYieldLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.yield.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>{dic?.payoutRatioLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.payout_ratio.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>{dic?.dividendFrequencyLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.frequency.formatted')}</div>
                </div>
                <div className=''>
                    <div className='text-sm'>{dic?.annualDividendLabel}</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.annual_rate.formatted')}</div>
                </div>
            </div>
        </Card>
    )
}

export default DividendYieldCard