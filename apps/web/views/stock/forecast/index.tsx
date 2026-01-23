import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import React from 'react';
import PriceCard from './customs/price-card';
import { getForecast } from '@/services/stock-forecast';
import { get } from 'lodash';
import MainChart from './customs/chart';
import LatestForecast from './customs/latest-forecast';
import EpsChart from './customs/eps-chart';
import RevenueChart from './customs/revenue-chart';

const ForecastPage = async ({ params, dictionary }: { params: any; dictionary?: any }) => {
    const { slug } = await params;
    const { data } = await getForecast(slug);
    const dic = dictionary?.stock?.stockMain?.forecastTab;
    return (
        <div className='space-y-4'>
            <Typography variant="h2" className="text-[24px]!" weight="semibold">{dic?.stockForecastTitle}</Typography>

            <Card className='p-0 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 rounded-xl'>
                <PriceCard data={get(data, 'ratings.data')} dictionary={dictionary} />
                <MainChart data={get(data, 'ratings.data')} prices={get(data, 'ratings.prices', [])} dictionary={dictionary} />
            </Card>
            <LatestForecast data={get(data, 'performance.data')} dictionary={dictionary} />
            <EpsChart data={get(data, 'earnings.data')} dictionary={dictionary} />
            <RevenueChart data={get(data, 'earnings.data')} dictionary={dictionary} />
        </div>
    )
}

export default ForecastPage