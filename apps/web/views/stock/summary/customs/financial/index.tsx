"use client"

import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@finranks/design-system/components/table"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@finranks/design-system/components/select"
import { Tabs, TabsTrigger, TabsList } from "@finranks/design-system/components/tabs"
import { memo, useMemo, useState } from "react"
import { get } from "lodash"
import { formatToMillion } from "@finranks/design-system/lib/utils"

type PeriodType = "annual" | "quarterly"
type TabType = "income" | "balance" | "cash"

const TAB_KEY_MAP: Record<TabType, string> = {
    income: "incomeStatement",
    balance: "balanceSheet",
    cash: "cashFlow",
}

const MAIN_KEYS = {
    incomeStatement: ["totalRevenue", "grossProfit", "operatingIncome", "netIncome", "ebitda"],
    balanceSheet: ["totalAssets", "totalLiabilities", "totalEquity", "totalDebt"],
    cashFlow: ["operatingCashFlow", "financingCashFlow", "investingCashFlow", "freeCashFlow"],
}

const Financials = memo(({ data, dictionary }: any) => {
    const [activeTab, setActiveTab] = useState<TabType>("income")
    const [period, setPeriod] = useState<PeriodType>("annual")
    
    const dic = dictionary?.stock?.stockMain?.summaryTab?.financialTable;
    const commonDic = dictionary?.common;

    const KEY_LABELS: Record<string, string> = {
        totalRevenue: dic?.incomeStatementTab?.totalRevenueLabel,
        grossProfit: dic?.incomeStatementTab?.grossProfitLabel,
        operatingIncome: dic?.incomeStatementTab?.operatingIncomeLabel,
        netIncome: dic?.incomeStatementTab?.netIncomeLabel,
        ebitda: dic?.incomeStatementTab?.ebitdaLabel,
        totalAssets: dic?.balanceSheetTab?.totalAssetsLabel,
        totalLiabilities: dic?.balanceSheetTab?.totalLiabilitiesLabel,
        totalEquity: dic?.balanceSheetTab?.totalEquityLabel,
        totalDebt: dic?.balanceSheetTab?.totalDebtLabel,
        operatingCashFlow: dic?.cashFlowTab?.operatingCashFlowLabel,
        financingCashFlow: dic?.cashFlowTab?.financingCashFlowLabel,
        investingCashFlow: dic?.cashFlowTab?.investingCashFlowLabel,
        freeCashFlow: dic?.cashFlowTab?.freeCashFlowLabel,
    }

    const sectionKey = TAB_KEY_MAP[activeTab]

    const selectedData = useMemo(
        () => data?.[sectionKey]?.[period] ?? {},
        [data, sectionKey, period]
    )

    const selectedTTM = useMemo(
        () => data?.[sectionKey]?.ttm ?? {},
        [data, sectionKey]
    )

    const dateValues = useMemo(
        () => Object.keys(selectedData),
        [selectedData]
    )

    const rows = MAIN_KEYS?.[sectionKey as keyof typeof MAIN_KEYS] ?? []

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Typography variant="h4">{dic?.financialTableTitle}</Typography>

                <div className="flex items-center gap-2">
                    <small className="text-white hidden md:block" style={{ fontSize: 11, marginRight: 16 }}>{dic?.valuesInfo}</small>
                    <Select value={period} onValueChange={(v) => setPeriod(v as PeriodType)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue className="text-white" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="annual">{dic?.select?.annual}</SelectItem>
                            <SelectItem value="quarterly">{dic?.select?.quarterly}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <small className="text-white block md:hidden" style={{ fontSize: 11, marginRight: 16 }}>{dic?.valuesInfo}</small>

            {/* TABS */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
                <TabsList variant="line">
                    <TabsTrigger value="income">{dic?.tabs?.incomeStatement}</TabsTrigger>
                    <TabsTrigger value="balance">{dic?.tabs?.balanceSheet}</TabsTrigger>
                    <TabsTrigger value="cash">{dic?.tabs?.cashFlow}</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* TABLE */}
            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">

                            <TableHead className=" text-[#777e90] uppercase border-r border-[#353945] p-4 text-center w-[220px]!">
                                {dic?.metric}
                            </TableHead>

                            {dateValues.map((date) => (
                                <TableHead
                                    key={date}
                                    className="text-[#777e90] uppercase text-center border-r border-[#353945]"
                                >
                                    {date}
                                </TableHead>
                            ))}

                            <TableHead className=" text-[#777e90] uppercase text-center w-[100px]!">
                                {commonDic?.ttm}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((key) => {
                            const ttm = get(selectedTTM, `${key}TTM`)

                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="text-white border-r border-[#353945] p-4 font-semibold text-center">
                                        {KEY_LABELS[key] ?? key}
                                    </TableCell>

                                    {dateValues.map((date) => {
                                        const val = selectedData?.[date]?.[key]
                                        return (
                                            <TableCell
                                                key={date}
                                                className="text-white text-center border-r border-[#353945] font-semibold"
                                            >
                                                {val ? formatToMillion(val) : commonDic?.na}
                                            </TableCell>
                                        )
                                    })}

                                    <TableCell className="text-white text-center font-semibold">
                                        {ttm ? formatToMillion(ttm) : commonDic?.na}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
})

export default Financials
