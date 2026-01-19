import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface SeoRow {
    PAGE: string;
    Title: string;
    Description: string;
    Keywords: string;
}

interface SeoEntry {
    title: string;
    description: string;
    keywords: string;
}

type SeoMap = Record<string, SeoEntry>;

/* ------------------------------------------------------------------ */
/* Cache */
/* ------------------------------------------------------------------ */

let seoCache: SeoMap | null = null;

/* ------------------------------------------------------------------ */
/* Path Resolver (Turborepo + Next.js safe) */
/* ------------------------------------------------------------------ */

function getSeoCsvPath(): string {
    // 1️⃣ Normal Next.js app path: apps/web/public/seo.csv
    const appPath = path.join(process.cwd(), 'public', 'seo.csv');
    if (fs.existsSync(appPath)) {
        return appPath;
    }

    // 2️⃣ Monorepo root fallback
    const monorepoRoot = process.env.INIT_CWD ?? process.cwd();
    const monorepoPath = path.join(
        monorepoRoot,
        'apps',
        'web',
        'public',
        'seo.csv'
    );

    if (fs.existsSync(monorepoPath)) {
        return monorepoPath;
    }

    throw new Error(
        'seo.csv not found. Expected at apps/web/public/seo.csv'
    );
}

/* ------------------------------------------------------------------ */
/* CSV Parser */
/* ------------------------------------------------------------------ */

function parseSeoData(): SeoMap {
    if (seoCache) return seoCache;

    try {
        const csvPath = getSeoCsvPath();
        const csvContent = fs.readFileSync(csvPath, 'utf-8');

        const lines = csvContent.trim().split('\n');
        if (lines.length < 2) return {};

        const headers = lines[0].split(',').map(h => h.trim());
        const seoData: SeoMap = {};

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            const values: string[] = [];
            let current = '';
            let inQuotes = false;

            for (let j = 0; j < line.length; j++) {
                const char = line[j];

                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }

            values.push(current.trim());

            const row = {} as SeoRow;
            headers.forEach((header, index) => {
                (row as any)[header] = values[index] ?? '';
            });

            if (!row.PAGE) continue;

            seoData[row.PAGE.toLowerCase()] = {
                title: row.Title,
                description: row.Description,
                keywords: row.Keywords,
            };
        }

        seoCache = seoData;
        return seoData;
    } catch (error) {
        console.error('SEO CSV parsing failed:', error);
        return {};
    }
}

/* ------------------------------------------------------------------ */
/* Generic SEO Metadata */
/* ------------------------------------------------------------------ */

export function getSeoMetadata(
    pageKey: string,
    slug?: string
): Metadata {
    const seoData = parseSeoData();
    let normalizedKey = pageKey.toLowerCase();

    if (slug && normalizedKey.includes('[slug]')) {
        normalizedKey = normalizedKey.replace('[slug]', slug.toUpperCase());
    }

    let data = seoData[normalizedKey];

    if (!data && normalizedKey.startsWith('http')) {
        const urlPath = normalizedKey.split('.com')[1];
        for (const key in seoData) {
            if (key.startsWith('http') && key.includes(urlPath)) {
                data = seoData[key];
                break;
            }
        }
    }

    if (!data) {
        return {
            title: 'Finranks — Stock analysis and ranking platform',
            description:
                'Discover the true quality of any stock with deep analysis and intuitive rankings.',
            keywords:
                'stock analysis, stock ranking, investment tools, financial metrics',
        };
    }

    const url = normalizedKey.startsWith('http')
        ? normalizedKey
        : `https://finranks.com${normalizedKey}`;

    return {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        authors: [{ name: 'Finranks' }],
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'website',
            siteName: 'Finranks',
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
        },
    };
}

/* ------------------------------------------------------------------ */
/* Stock SEO Metadata */
/* ------------------------------------------------------------------ */

export function getStockSeoMetadata(
    ticker: string,
    tab = 'summary',
    companyName?: string
): Metadata {
    const seoData = parseSeoData();
    const symbol = ticker.toUpperCase();
    const url = `https://finranks.com/stock/${symbol}/${tab}`;

    let data = seoData[url.toLowerCase()];

    if (!data) {
        const tabTitles: Record<string, string> = {
            summary: 'stock ranking, summary, quote, chart',
            news: 'stock latest news, headlines, insights',
            chart: 'stock chart, quote',
            financial: 'financial statements, ratios',
            dividends: 'dividend, yield',
            forecast: 'forecast, price targets',
            ownership: 'ownership, major shareholders',
            profile: 'company profile',
        };

        const tabDescriptions: Record<string, string> = {
            summary:
                'real-time quote, financial summary, ranking score, and performance chart',
            news:
                'latest financial headlines, analyst commentary, and sentiment news',
            chart:
                'interactive stock chart with real-time price data and performance trends',
            financial:
                'complete financial data including income statement, balance sheet, and cash flow',
            dividends: 'dividend history, yield, and payout ratio',
            forecast: 'stock forecast, price targets, and growth outlook',
            ownership:
                'ownership structure including institutional and insider holdings',
            profile:
                'company profile including business overview, leadership, and operations',
        };

        const displayName = companyName ?? symbol;

        data = {
            title: `${displayName} (${symbol}) ${tabTitles[tab] ?? 'stock analysis'
                } | Finranks`,
            description: `Discover ${displayName} (${symbol}) with Finranks — ${tabDescriptions[tab] ?? 'comprehensive stock analysis and insights'
                }.`,
            keywords: `${symbol} stock, ${symbol} analysis, ${displayName}, stock analysis`,
        };
    }

    return {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        authors: [{ name: 'Finranks' }],
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'website',
            siteName: 'Finranks',
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
        },
        alternates: {
            canonical: url,
        },
    };
}

/* ------------------------------------------------------------------ */
/* Compare SEO Metadata */
/* ------------------------------------------------------------------ */

export function getCompareSeoMetadata(ticker: string): Metadata {
    const seoData = parseSeoData();
    const symbol = ticker?.toUpperCase();
    const url = `https://finranks.com/compare/${symbol}`;

    let data = seoData[url.toLowerCase()];

    if (!data) {
        data = {
            title: `Compare ${symbol} with other stocks | Finranks`,
            description: `Easily compare ${symbol}'s financial performance and ratios with other companies.`,
            keywords: `compare ${symbol}, ${symbol} competitors, stock comparison`,
        };
    }

    return {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        authors: [{ name: 'Finranks' }],
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'website',
            siteName: 'Finranks',
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
        },
        alternates: {
            canonical: url,
        },
    };
}
