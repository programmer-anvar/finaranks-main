"use client"
import { Card } from '@finranks/design-system/components/card'
import { Tabs, TabsList, TabsTrigger } from '@finranks/design-system/components/tabs'
import { Typography } from '@finranks/design-system/components/typography'
import React, { useState } from 'react'
import IncomeStatementTable from './income-statement-table'
import { useTabStore } from '@/stores/shared'
import BalanceSheetTable from './balance-sheet-table'
import CashFlowTable from './cashflow-table'
import { useMediaQuery } from '@uidotdev/usehooks'
import MobileFinancialTable from './mobile-table'

const Tables = ({ financialsNew, incomeStatement, balanceSheet, cashFlow, dictionary }: any) => {
    const [view, setView] = useState("annual");
    const activeTab = useTabStore((state) => state.activeTab);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const dic = dictionary?.stock?.stockMain?.financialTab;
    const commonDic = dictionary?.common;

    const getTitle = () => {
        if (activeTab === "income-statement") {
            return dic?.incomeStatementTab?.incomeStatementTabTable?.incomeStatementAnnualTitle;
        } else if (activeTab === "balance-sheet") {
            return dic?.balanceSheetTab?.balanceSheetTabTable?.balanceSheetAnnualTitle;
        } else if (activeTab === "cash-flow") {
            return dic?.cashFlowTab?.cashFlowTabTable?.cashFlowAnnualTitle;
        }
        return `Income Statement (${view.charAt(0).toUpperCase() + view.slice(1)})`;
    };

    const getFinancialsNote = () => {
        return dic?.incomeStatementTab?.incomeStatementTabTable?.financialsNote || "Financials in millions USD. Fiscal year is January - December.";
    };

    return (
        <Card className="p-4 md:p-6 rounded-xl space-y-4">
            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                <div >
                    <Typography variant='h2' className='text-sm md:text-[20px]! font-bold!'>
                        {activeTab === "income-statement" && `${dic?.tabs?.incomeStatementTab} `}
                        {activeTab === "balance-sheet" && `${dic?.tabs?.balanceSheetTab} `}
                        {activeTab === "cash-flow" && `${dic?.tabs?.cashFlowTab} `}
                        <span className='capitalize'>({view})</span>
                    </Typography>
                    <Typography variant='small' className='text-xs!'>{getFinancialsNote()}</Typography>
                </div>
                <Tabs value={view} onValueChange={setView}>
                    <TabsList className='w-fit'>
                        <TabsTrigger className='text-xs' value='annual'>{dic?.incomeStatementTab?.incomeStatementTabTable?.tableTabs?.annual || commonDic?.annual || "Annual"}</TabsTrigger>
                        <TabsTrigger className='text-xs' value='quarterly'>{dic?.incomeStatementTab?.incomeStatementTabTable?.tableTabs?.quarterly || commonDic?.quarterly || "Quarterly"}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {activeTab === "income-statement" && !isMobile &&
                <IncomeStatementTable
                    newData={financialsNew} data={incomeStatement?.incomeStatement} view={view} dictionary={dictionary} />}
            {(activeTab === 'balance-sheet' && !isMobile && balanceSheet?.balanceSheet) &&
                <BalanceSheetTable data={balanceSheet.balanceSheet} newData={financialsNew} view={view} dictionary={dictionary} />}
            {(activeTab === 'cash-flow' && !isMobile && cashFlow?.cashFlow) && (
                <CashFlowTable data={cashFlow.cashFlow} newData={financialsNew} view={view} dictionary={dictionary} />
            )}

            {activeTab === "income-statement" && isMobile && <MobileFinancialTable data={incomeStatement?.incomeStatement} view={view} financialsNew={financialsNew} dictionary={dictionary} type="income" />}
            {activeTab === "balance-sheet" && isMobile && <MobileFinancialTable data={balanceSheet?.balanceSheet} view={view} financialsNew={financialsNew} dictionary={dictionary} type="balance" />}
            {activeTab === "cash-flow" && isMobile && <MobileFinancialTable data={cashFlow?.cashFlow} view={view} financialsNew={financialsNew} dictionary={dictionary} type="cashflow" />}
        </Card>
    )
}

export default Tables