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

interface GrowthProps {
    data: Record<string, any>;
    dictionary?: any;
}

const ROWS = ["q/q", "y/y", "3yAverage", "5yAverage"]

const Growth = ({ data, dictionary }: GrowthProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.growth;
    const commonDic = dictionary?.common;

    const KEY_LABELS: Record<string, string> = {
        "q/q": dic?.qoqLabel || "Q/Q",
        "y/y": dic?.yoyLabel || "Y/Y",
        "3yAverage": dic?.avg3yLabel || "3y average",
        "5yAverage": dic?.avg5yLabel || "5y average",
    }

    const growth = get(data, "growth", {})

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Typography variant="h4">{dic?.growthTitle}</Typography>
            </div>

            {/* TABLE */}
            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.revenueColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.netIncomeColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.epsColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.fcfColumn}
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] w-[100px]!">
                                {dic?.scoreColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {ROWS.map((key) => {
                            const rowData = get(growth, key, {})
                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="text-white border-r border-[#353945] p-4 font-semibold text-center">
                                        {KEY_LABELS[key]}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.revenueGrowth ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.netIncomeGrowth ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.EPSGrowth ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.FCFGrowth ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell
                                        className="text-white text-center font-semibold"
                                    >
                                        {rowData.avgGrowthScore ?? (commonDic?.na || "N/A")}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        {/* FOOTER */}
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScoreLabel}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{ backgroundColor: get(growth, "weightedAverage.scoreColor") }}
                            >
                                {get(growth, "weightedAverage.score") ?? (commonDic?.na || "N/A")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default Growth
