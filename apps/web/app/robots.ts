export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/account/verify*', '/account/reset-password*'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/account/verify*', '/account/reset-password*'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/account/verify*', '/account/reset-password*'],
            },
        ],
        sitemap: 'https://finranks.com/sitemap.xml',
    }; 
}
