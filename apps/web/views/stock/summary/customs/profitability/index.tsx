"use client"

import React, { memo } from "react"
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
import { get } from "lodash";
import TrendHoverModalEnhanced from "./customs/chart-card"

const getTrendData = (annual: Record<string, any>, key: string): number[] => {
    if (!annual || typeof annual !== "object") return []
    return Object.values(annual)
        .map((item: any) => item?.[key])
        .filter((v) => typeof v === "number")
}
interface ProfitabilityProps {
    data: {
        TTM: Record<string, any>
        industry: Record<string, any>
        annual: Record<string, any>
    };
    dictionary?: any;
}

const formatNumber = (value?: number) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A"

const Profitability = memo(({ data, dictionary }: ProfitabilityProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.profitabilityTable;
    const commonDic = dictionary?.common;

    const METRICS = [
        { key: "grossMarginRatio", label: dic?.grossMarginLabel || "Gross margin %" },
        { key: "operatingMarginRatio", label: dic?.operatingMarginLabel || "Operating margin %" },
        { key: "netMarginRatio", label: dic?.netMarginLabel },
        { key: "ebitdaMarginRatio", label: dic?.ebitdaMarginLabel || "EBITDA margin %" },
        { key: "cashFlowMarginRatio", label: dic?.cashFlowMarginLabel || "Cash flow margin %" },
    ]

    const TTM = get(data, "TTM")
    const industry = get(data, "industry")
    const annual = get(data, "annual")

    return (
        <Card className="space-y-4 p-4 md:p-6 rounded-xl">
            <Typography variant="h4">{dic?.profitabilityTitle}</Typography>

            <div className="overflow-x-auto rounded-lg border border-[#353945]">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.ratioColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.industryColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.trend5yColumn}
                            </TableHead>
                            <TableHead className="text-center text-xs font-semibold uppercase text-[#777e90] w-[100px]!">
                                {dic?.scoreColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => (
                            <TableRow key={key} className="border-b border-[#353945] hover:bg-purple-900/10">
                                <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                    {label}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(TTM?.[key])}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(industry?.[key])}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center flex items-center justify-center">
                                    <TrendHoverModalEnhanced
                                        data={annual}
                                        metric={key}
                                        lastReport={TTM}
                                    />
                                </TableCell>

                                <TableCell className="text-center text-white font-semibold">
                                    {TTM?.[`${key}Score`] ?? (commonDic?.na || "N/A")}
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Footer row: weighted average score */}
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScoreLabel}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{ backgroundColor: TTM?.weightedAverageScoreColor }}
                            >
                                {TTM?.weightedAverageScore
                                    ? Number(TTM.weightedAverageScore).toFixed(1)
                                    : (commonDic?.na || "N/A")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
})

export default Profitability
