'use client'

import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import { get } from "lodash"

interface DcfModelProps {
    data?: any;
    dictionary?: any;
}

const DCF_VALUE_PATHS = [
    'discountRate',
    'perpetualGrowthRate',
    'fairValue',
    'stockPrice',
    'upside',
    'cagr.revenue_cagr',
    'cagr.free_cash_flow_cagr',
];

const DcfModel = ({ data, dictionary }: DcfModelProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.dcfModel;
    const commonDic = dictionary?.common;

    const InfoRow = ({ label, value }: { label: string; value: any }) => (
        <div className="flex items-center justify-between border-b border-[#353945] py-2 last:border-b-0">
            <span className="text-sm text-white">{label}</span>
            <span className="text-sm font-semibold text-white">
                {value ?? (commonDic?.na || "N/A")}
            </span>
        </div>
    )

    const isEmptyDcfModel = (data?: any): boolean => {
        if (!data) return true;

        return DCF_VALUE_PATHS.every((path) => {
            const value = get(data, path);

            if (value === null || value === undefined) return true;
            if (typeof value === 'string' && value.trim() === '') return true;

            return false;
        });
    };

    const isEmpty = isEmptyDcfModel(data);
    if (isEmpty) {
        return (
            <Card className='w-full rounded-[20px] p-4 md:p-6'>
                <Typography variant="h4" as="h2" className='pb-0'>{dic?.dcfModelTitle}</Typography>
                <div className='w-full h-100 flex items-center justify-center flex-col'>
                    <Typography variant="body" as="h2" color='helper' className='pb-0'>{commonDic?.dataNotAvailable}</Typography>
                    <Typography variant="small" as="p" color='helper' className='pb-0' align='center'>{commonDic?.dataNotCalculated}</Typography>
                </div>
            </Card>
        );
    }
    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <Typography variant="h4">{dic?.dcfModelTitle}</Typography>

            <div className="space-y-1">
                <InfoRow
                    label={dic?.dcfPeriodLabel}
                    value={get(data, "period")}
                />
                <InfoRow
                    label={dic?.discountRateLabel}
                    value={get(data, "discountRate")}
                />
                <InfoRow
                    label={dic?.perpetualGrowthLabel}
                    value={get(data, "perpetualGrowthRate")}
                />
                <InfoRow
                    label={dic?.revenueCagrLabel}
                    value={get(data, "cagr.revenue_cagr")}
                />
                <InfoRow
                    label={dic?.fcfCagrLabel}
                    value={get(data, "cagr.free_cash_flow_cagr_year")}
                />
                <InfoRow
                    label={dic?.fairValueLabel}
                    value={get(data, "fairValue")}
                />
                <InfoRow
                    label={dic?.stockPriceLabel}
                    value={get(data, "stockPrice")}
                />
            </div>
        </Card>
    )
}

export default DcfModel
