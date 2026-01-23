import { getBalancesheet, getCashflow, getIncomestatement, companyFinancials } from '@/services/stock-financial';
import TabsComponent from './customs/tabs';
import Charts from './customs/charts';
import { SearchParams } from 'nuqs';
import Tables from './customs/tables';



const FinancialPage = async ({ params, dictionary }: { params: any, searchParams: Promise<SearchParams>, dictionary?: any }) => {
    const { slug } = await params;
    const { data: incomeStatement } = await getIncomestatement(slug);
    const { data: balanceSheet } = await getBalancesheet(slug);
    const { data: cashFlow } = await getCashflow(slug);
    const { data: financialsNew } = await companyFinancials(slug);
    return (
        <div className='space-y-4'>
            <Charts incomeStatement={incomeStatement} balanceSheet={balanceSheet} cashFlow={cashFlow} financialsNew={financialsNew} dictionary={dictionary} />
            <TabsComponent dictionary={dictionary} />
            <Tables financialsNew={financialsNew} incomeStatemen={incomeStatement} balanceSheet={balanceSheet} cashFlow={cashFlow} dictionary={dictionary} />
        </div>
    )
}

export default FinancialPage