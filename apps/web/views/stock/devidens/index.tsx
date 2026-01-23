import React from 'react'
import DividendYearChart from './customs/chart'
import DividendYieldCard from './customs/card'
import { getDividends } from '@/services/stock-devidens';
import { get } from 'lodash';
import HistoryTable from './customs/history-table';

const DevidensPage = async ({ params, dictionary }: { params: any; dictionary?: any }) => {
    const { slug } = await params
    const { data } = await getDividends(slug);
    const info = get(data, 'info.data')
    const yield_history = get(data, 'yield_history.data')
    const dividend_history = get(data, 'dividend_history.data');

    return (
        <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4'>
                <DividendYieldCard data={info} dictionary={dictionary} />
                <DividendYearChart data={yield_history} dictionary={dictionary} />
            </div>
            <HistoryTable data={dividend_history} dictionary={dictionary} />
        </div>
    )
}

export default DevidensPage
