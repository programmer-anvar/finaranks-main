'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import get from 'lodash/get';
import { useAppContext } from '@/lib/providers/customs/app';
import config from '@/lib/config';
import { useModals } from '@/stores/modal';
import { Card } from '@finranks/design-system/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';


/* ----------------------------- Types ----------------------------- */

interface Metric {
    label: string;
    value: string;
}

interface MarketData {
    previousClose?: number;
    change?: number;
    change_p?: number;
}

interface CompanyInfo {
    name?: string;
}

interface StockResponse {
    info?: {
        data?: CompanyInfo;
    };
    market?: MarketData;
}

interface CompareScores {
    [slug: string]: Record<string, string | number>;
}

interface CompareInfo {
    [slug: string]: StockResponse;
}

interface InitialData {
    metrics: Metric[];
    scores: Record<string, string | number>;
    info: {
        data?: CompanyInfo;
    };
    market: MarketData;
    name: string;
    change: number;
    change_p: number;
    previousClose: number;
}

interface ComparePageProps {
    initialData: InitialData;
}

/* --------------------------- Component --------------------------- */

const MobileComparePage: React.FC<ComparePageProps> = ({ initialData }) => {
    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const compareValue = searchParams.get('compare');
    const compareItems = compareValue ? compareValue.split(',') : [];
    const {setModal } = useModals()

    const { setState } = useAppContext();

    const [compareScores, setCompareScores] = useState<CompareScores>({});
    const [compareInfo, setCompareInfo] = useState<CompareInfo>({});

    const {
        metrics,
        scores,
        name,
        change,
        change_p,
        previousClose,
    } = initialData;

    const comparisonTitle = [id, ...compareItems].join(' vs. ');

    /* --------------------------- API Calls --------------------------- */

    const getScores = async (symbol: string) => {
        try {
            const { data } = await axios.get(
                `${config.APP_URL}/companies/${symbol}/compare/scores/`
            );

            setCompareScores(prev => ({
                ...prev,
                [symbol]: get(data, 'data', {}),
            }));
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    const getInfo = async (symbol: string) => {
        try {
            const [stockRes, quoteRes] = await Promise.all([
                axios.get(`${config.APP_URL}/company/stocks/${symbol}?include=info,market`),
                axios.get(`${config.APP_URL}/quotes/${symbol}?t=${Date.now()}`),
            ]);

            const stockData = get(stockRes, 'data.data', {});
            const quoteData = get(quoteRes, 'data.data', null);

            const mergedData: StockResponse = {
                ...stockData,
                market: {
                    ...get(stockData, 'market.data', {}),
                    ...(quoteData && {
                        previousClose:
                            get(quoteData, 'markets.regular.price') ??
                            get(stockData, 'market.data.previousClose'),
                        change:
                            get(quoteData, 'markets.regular.change') ??
                            get(stockData, 'market.data.change'),
                        change_p:
                            get(quoteData, 'markets.regular.changePercent') ??
                            get(stockData, 'market.data.change_p'),
                    }),
                },
            };

            setCompareInfo(prev => ({
                ...prev,
                [symbol]: mergedData,
            }));
        } catch (error) {
            try {
                const { data } = await axios.get(
                    `${config.APP_URL}/company/stocks/${symbol}?include=info,market`
                );

                setCompareInfo(prev => ({
                    ...prev,
                    [symbol]: get(data, 'data', {}),
                }));
            } catch (err) {
                console.error('Error fetching info:', err);
            }
        }
    };

    /* --------------------------- Effects --------------------------- */

    useEffect(() => {
        if (!compareValue) return;

        compareItems.forEach(symbol => {
            getScores(symbol);
            getInfo(symbol);
        });
    }, [compareValue]);

    /* ---------------------------- Render ---------------------------- */

    return (
        <div className=" mobile-compare-page">
            <div className="space-y-4">
                {/* First Section - Stock Cards Comparison */}
                <div >
                    <Card className="main-box p-4 rounded-xl">
                        <div className="mobile-compare-header">
                            <div className="mobile-compare-subtitle">Compare stocks</div>
                            <h2 className="mobile-compare-title">{comparisonTitle}</h2>
                        </div>

                        <div className="mobile-stock-list">
                            {/* Base Stock Card */}
                            <div className="mobile-stock-item">
                                <div className="mobile-stock-item__header">
                                    <span className="mobile-stock-item__symbol">{id}</span>
                                </div>
                                <div className="mobile-stock-item__body">
                                    <div className="mobile-stock-item__price">{previousClose.toFixed(2)}</div>
                                    <div className={`mobile-stock-item__change ${change < 0 ? 'negative' : 'positive'}`}>
                                        <span>{change < 0 ? '↓' : '↑'}</span>
                                        <span>{Math.abs(change_p).toFixed(2)}%</span>
                                    </div>
                                </div>
                                <div className="mobile-stock-item__footer">
                                    <span className="mobile-stock-item__name">{name}</span>
                                </div>
                            </div>

                            {/* Comparison Stock Cards */}
                            {compareItems.map(compSlug => {
                                const compInfo = get(compareInfo[compSlug], 'info.data');
                                const compMarket = get(compareInfo[compSlug], 'market');

                                const compName = get(compInfo, 'name', '')
                                const compChange = get(compMarket, 'change', 0)
                                const compChangeP = get(compMarket, 'change_p', 0)
                                const compPreviousClose = get(compMarket, 'previousClose', 0)

                                return (
                                    <div key={compSlug} className="mobile-stock-item mobile-stock-item--editable">
                                        <div className="mobile-stock-item__actions">
                                            <button
                                                className="mobile-stock-item__edit-btn"
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        selected: compSlug
                                                    }))
                                                    setModal({ addStock: true })
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                className="mobile-stock-item__delete-btn"
                                                onClick={() => {
                                                    const newCompareItems = compareItems.filter(item => item !== compSlug);
                                                    const searchParams = new URLSearchParams(window.location.search);
                                                    if (newCompareItems.length > 0) {
                                                        searchParams.set('compare', newCompareItems.join(','));
                                                    } else {
                                                        searchParams.delete('compare');
                                                    }
                                                    window.location.search = searchParams.toString();
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5.33398 4.00004V2.66671C5.33398 2.31309 5.47446 1.97395 5.72451 1.7239C5.97456 1.47385 6.3137 1.33337 6.66732 1.33337H9.33398C9.68761 1.33337 10.0267 1.47385 10.2768 1.7239C10.5268 1.97395 10.6673 2.31309 10.6673 2.66671V4.00004M12.6673 4.00004V13.3334C12.6673 13.687 12.5268 14.0261 12.2768 14.2762C12.0267 14.5262 11.6876 14.6667 11.334 14.6667H4.66732C4.3137 14.6667 3.97456 14.5262 3.72451 14.2762C3.47446 14.0261 3.33398 13.687 3.33398 13.3334V4.00004H12.6673Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="mobile-stock-item__header">
                                            <span className="mobile-stock-item__symbol">{compSlug}</span>
                                        </div>
                                        <div className="mobile-stock-item__body">
                                            <div className="mobile-stock-item__price">{compPreviousClose.toFixed(2)}</div>
                                            <div className={`mobile-stock-item__change ${compChange < 0 ? 'negative' : 'positive'}`}>
                                                <span>{compChange < 0 ? '↓' : '↑'}</span>
                                                <span>{Math.abs(compChangeP).toFixed(2)}%</span>
                                            </div>
                                        </div>
                                        <div className="mobile-stock-item__footer">
                                            <span className="mobile-stock-item__name">{compName}</span>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Add Stock Button */}
                            {compareItems.length < 3 && (
                                <button
                                    className="mobile-stock-add-btn"
                                    onClick={() => {
                                        setState(prev => ({
                                            ...prev,
                                        }))
                                        setModal({ addStock: true })
                                    }}
                                >
                                    <div className="mobile-stock-add-btn__icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_302_10473)">
                                                <path d="M11.2856 7.42941H8.57129V4.71512C8.57129 4.63655 8.507 4.57227 8.42843 4.57227H7.57129C7.49272 4.57227 7.42843 4.63655 7.42843 4.71512V7.42941H4.71415C4.63557 7.42941 4.57129 7.4937 4.57129 7.57227V8.42941C4.57129 8.50798 4.63557 8.57227 4.71415 8.57227H7.42843V11.2866C7.42843 11.3651 7.49272 11.4294 7.57129 11.4294H8.42843C8.507 11.4294 8.57129 11.3651 8.57129 11.2866V8.57227H11.2856C11.3641 8.57227 11.4284 8.50798 11.4284 8.42941V7.57227C11.4284 7.4937 11.3641 7.42941 11.2856 7.42941Z" fill="white" />
                                                <path d="M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM8 14.6429C4.33214 14.6429 1.35714 11.6679 1.35714 8C1.35714 4.33214 4.33214 1.35714 8 1.35714C11.6679 1.35714 14.6429 4.33214 14.6429 8C14.6429 11.6679 11.6679 14.6429 8 14.6429Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_302_10473">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="mobile-stock-add-btn__text">Add Stock</div>
                                </button>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Second Section - Metrics Comparison Table */}
                <div>
                    <Card className="main-box p-4 rounded-xl">
                        <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
                            <Table >
                                <TableHeader className='rounded-t-md!'>
                                    <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4 sticky left-0 z-30  bg-(--main-color) ">
                                            Company
                                        </TableHead>
                                        {metrics.map(metric => (
                                            <TableHead key={metric.value} className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                                {metric.label}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                        <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4 sticky left-0 z-20
    bg-[#12092C]">
                                            <div className="company-name">{id}</div>
                                            <div className="company-subtitle">{name}</div>
                                        </TableCell>
                                        {metrics.map(metric => (
                                            <TableCell key={metric.value} className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">
                                                {scores?.[metric.value] ?? '-'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {/* Comparison Stock Rows */}
                                    {compareItems.map(compSlug => {
                                        const compInfo = get(compareInfo[compSlug], 'info.data');
                                        const compName = get(compInfo, 'name', '')

                                        return (
                                            <TableRow key={compSlug} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4 sticky left-0 z-20
    bg-[#12092C]">
                                                    <div className="company-name">{compSlug}</div>
                                                    <div className="company-subtitle">{compName}</div>
                                                </TableCell>
                                                {metrics.map(metric => (
                                                    <TableCell key={metric.value} className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4 ">
                                                        {compareScores[compSlug]?.[metric.value] ?? '-'}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {compareItems.length < 3 && (
                            <button
                                className="mobile-add-stock-bottom"
                                onClick={() => {
                                    setModal({ addStock: true })
                                }}
                            >
                                <span className="mobile-add-stock-bottom__icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_302_10473_bottom)">
                                            <path d="M11.2856 7.42941H8.57129V4.71512C8.57129 4.63655 8.507 4.57227 8.42843 4.57227H7.57129C7.49272 4.57227 7.42843 4.63655 7.42843 4.71512V7.42941H4.71415C4.63557 7.42941 4.57129 7.4937 4.57129 7.57227V8.42941C4.57129 8.50798 4.63557 8.57227 4.71415 8.57227H7.42843V11.2866C7.42843 11.3651 7.49272 11.4294 7.57129 11.4294H8.42843C8.507 11.4294 8.57129 11.3651 8.57129 11.2866V8.57227H11.2856C11.3641 8.57227 11.4284 8.50798 11.4284 8.42941V7.57227C11.4284 7.4937 11.3641 7.42941 11.2856 7.42941Z" fill="#3B82F6" />
                                            <path d="M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM8 14.6429C4.33214 14.6429 1.35714 11.6679 1.35714 8C1.35714 4.33214 4.33214 1.35714 8 1.35714C11.6679 1.35714 14.6429 4.33214 14.6429 8C14.6429 11.6679 11.6679 14.6429 8 14.6429Z" fill="#3B82F6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_302_10473_bottom">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span>Add Stock</span>
                            </button>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MobileComparePage;
