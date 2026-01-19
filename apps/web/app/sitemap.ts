export default function sitemap() {
    const baseUrl = 'https://finranks.com';

    // Static pages
    const staticPages = [
        '',
        '/news',
        '/about',
        '/screener',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Profile pages (requires authentication, lower priority)
    const profilePages = [
        '/profile',
        '/profile/dashboard',
        '/profile/personal-information',
        '/profile/subscription',
        '/profile/transactions',
        '/profile/settings',
        '/profile/help',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    // Popular stock pages (high priority)
    const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];
    const stockTabs = ['summary', 'news', 'chart', 'financial', 'dividends', 'forecast', 'ownership', 'profile'];

    const stockPages = popularStocks.flatMap((ticker) =>
        stockTabs.map((tab) => ({
            url: `${baseUrl}/stock/${ticker}/${tab}`,
            lastModified: new Date(),
            changeFrequency: tab === 'news' ? 'daily' : 'weekly',
            priority: tab === 'summary' ? 0.9 : 0.7,
        }))
    );

    // Compare pages for popular stocks
    const comparePages = popularStocks.map((ticker) => ({
        url: `${baseUrl}/compare/${ticker}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [
        ...staticPages,
        ...stockPages,
        ...comparePages,
        ...profilePages,
    ];
}
