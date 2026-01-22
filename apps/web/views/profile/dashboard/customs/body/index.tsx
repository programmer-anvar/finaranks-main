'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import get from 'lodash/get';


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@finranks/design-system/components/table';

import { Button } from '@finranks/design-system/components/Button';
import { useAppContext } from '@/lib/providers/customs/app';
import config from '@/lib/config';
import { CloudLightning, Loader, Trash } from 'lucide-react';
import { cn } from '@finranks/design-system/lib/utils';

export type TWatchlistCompany = {
    ticker: string;
    name?: string;
    companyName?: string;
    [key: string]: string | number | undefined;
};

export type TWatchlistSetting = {
    label: string;
    value: string;
    show: boolean;
};

type DesktopDashboardPageProps = {
    watchlistData?: TWatchlistCompany[];
};

const Body: React.FC<DesktopDashboardPageProps> = ({ dictionary }) => {
    console.log('dic', dictionary)
    const { state, setState } = useAppContext();
    const [deletingTicker, setDeletingTicker] = useState<string | null>(null);

    /* ------------------ Derived State ------------------ */

    const watchlistSetting = useMemo<TWatchlistSetting[]>(
        () => get(state, 'watchlistSetting', []).filter((s: TWatchlistSetting) => s.show),
        [state.watchlistSetting]
    );

    const items = useMemo<TWatchlistCompany[]>(
        // @ts-expect-error
        () => get(state, 'watchlistCompanies', []),
        [state.watchlistCompanies]
    );

    const isLoading = Boolean(state.watchlistCompaniesLoading);

    const isEmpty = items.length === 0;

    /* ------------------ API ------------------ */

    const getWatchlist = useCallback(async () => {
        if (!state.access_token) return;

        setState(prev => ({ ...prev, watchlistCompaniesLoading: true }));

        try {
            const { data } = await axios.get(
                `${config.APP_URL}/watchlist/my-watchlist/companies`,
                {
                    headers: {
                        Authorization: `Bearer ${state.access_token}`,
                    },
                }
            );

            setState(prev => ({
                ...prev,
                watchlistCompanies: data?.data ?? [],
                watchlistCompaniesLoading: false,
            }));
        } catch (error) {
            console.error('[WATCHLIST] Fetch failed:', error);
            setState(prev => ({ ...prev, watchlistCompaniesLoading: false }));
        }
    }, [state.access_token, setState]);

    const removeFromWatchlist = useCallback(
        async (ticker: string) => {
            if (deletingTicker || !state.access_token) return;

            setDeletingTicker(ticker);

            try {
                await axios.delete(`${config.APP_URL}/watchlist/companies`, {
                    data: {
                        id: ticker,
                        watchlistId: 'my-watchlist',
                    },
                    headers: {
                        Authorization: `Bearer ${state.access_token}`,
                    },
                });

                await getWatchlist();
            } catch (error) {
                console.error('[WATCHLIST] Delete failed:', error);
            } finally {
                setDeletingTicker(null);
            }
        },
        [deletingTicker, state.access_token, getWatchlist]
    );



    /* ------------------ Effects ------------------ */

    useEffect(() => {
        if (state.access_token) {
            getWatchlist();
        }
    }, [state.access_token, getWatchlist]);


    if (isEmpty) {
        return (
            <div className="flex flex-col items-center gap-4">
                <img src="/images/empty.png" alt="Empty" />
                <Button>{dictionary.watchListBtn}</Button>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='w-full h-[300px] flex items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }


    /* ------------------ Render ------------------ */

    return (
        <div className='mt-4'>
            {/* Content */}
            {items.length > 0 && (
                <div className="relative overflow-x-auto scrollable">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-purple-600">
                                <TableHead
                                    className="
                                                sticky left-0 z-20 
                                                bg-muted/50 
                                                font-semibold 
                                                text-white
                                                backdrop-blur
                                            "
                                >
                                    {dictionary.listTable.companyLabel}
                                </TableHead>

                                {watchlistSetting.map(setting => (
                                    <TableHead
                                        key={setting.value}
                                        className="font-medium text-white whitespace-nowrap border-r bg-purple-600"
                                    >
                                        {setting.label}
                                    </TableHead>
                                ))}

                                <TableHead className="w-[60px] bg-purple-600" >{dictionary.listTable.action}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.ticker}
                                    className="
                                            transition-colors
                                            hover:bg-purple-500/20
                                            data-[state=selected]:bg-purple-500/20
                                        ">
                                    {/* Sticky first column */}
                                    <TableCell className="
                                                sticky left-0 z-10
                                                bg-background/10
                                                backdrop-blur-md
                                                border-r
                                                border-border
                                                min-w-[100px] 
                                            ">
                                        <div className="font-medium text-white">{item.ticker}</div>
                                        <div className="text-sm text-white">
                                            {item.name || item.companyName}
                                        </div>
                                    </TableCell>

                                    {watchlistSetting.map(setting => {
                                        console.log(Number(item[setting.value]?.toString().split("%")[0]) < 0)
                                        return (
                                            <TableCell key={setting.value} className={cn("border-r text-white", {
                                                "bg-[#fa292979]": item[setting.value] && Number(item[setting.value]?.toString().split("%")[0]) < 0,
                                                "bg-[#16a34a79]": item[setting.value] && Number(item[setting.value]?.toString().split("%")[0]) > 0,
                                            })}>
                                                {item[setting.value] ?? '-'}
                                            </TableCell>
                                        )
                                    })}

                                    <TableCell>
                                        {deletingTicker === item.ticker ? (
                                            <Loader className='animate-spin' />
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                hasIconOnly
                                                iconDescription="Remove from watchlist"
                                                onClick={() => removeFromWatchlist(item.ticker)}
                                            >
                                                <Trash className='text-red-500' />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default Body;
