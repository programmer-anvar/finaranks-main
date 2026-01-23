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
import { get } from "lodash"
import { memo } from "react"

interface ForecastProps {
    data: Record<string, any>
    dictionary?: any
}

const ROWS = ["currentQuarter", "nextQuarter", "currentYear", "nextYear"]

const Forecast = memo(({ data, dictionary }: ForecastProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.forecastTable;
    const commonDic = dictionary?.common;
    
    const KEY_LABELS: Record<string, string> = {
        currentQuarter: dic?.currentQuarterLabel,
        nextQuarter: dic?.nextQuarterLabel,
        currentYear: dic?.currentYearLabel,
        nextYear: dic?.nextYearLabel,
    }
    
    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Typography variant="h4">{dic?.forecastTitle}</Typography>

            </div>

            {/* TABLE */}
            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className=" border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className=" border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.revenueGrowthColumn}
                            </TableHead>
                            <TableHead className=" border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.epsGrowthColumn}
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[100px]!">
                                {dic?.scoreColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {ROWS.map((key) => {
                            const rowData = get(data, key, {})
                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="text-white border-r border-[#353945] p-4 font-semibold text-center">
                                        {KEY_LABELS[key]}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.revenueGrowth ?? commonDic?.na}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.EPSGrowth ?? commonDic?.na}
                                    </TableCell>

                                    <TableCell
                                        className="text-white text-center font-semibold "
                                    >
                                        {rowData.weightedAverageScore ?? commonDic?.na}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScoreLabel}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{ backgroundColor: get(data, "avg.weightedAverageScoreColor") }}
                            >
                                {get(data, "avg.weightedAverageScore") ?? commonDic?.na}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
})

export default Forecast
