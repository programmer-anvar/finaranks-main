import { Metadata } from "next";
import { ReactNode } from "react";
import { getDeviceType } from "@/utils/get-device-type";
import { headers } from "next/headers";

import LayoutWrapper from "@/components/layout/wrapper";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import MicrosoftClarity from "@/components/analytics/microsoft-clarity";
import { Inter } from 'next/font/google';


import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  const isProduction =
    host === "finranks.com" || host === "www.finranks.com";

  return {
    title: 'Finranks — Stock analysis and ranking platform',
    description: 'Discover the true quality of any stock with deep analysis and intuitive rankings. Access real-time data and tools for smarter investment decisions.',
    keywords: 'stock analysis, stock ranking, investment tools, financial metrics, market data, fair value, stock research',
    authors: [{ name: 'Finranks' }],
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/favicon.ico', sizes: 'any' }
      ],
      apple: [
        { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      other: [
        { rel: 'mask-icon', url: '/favicons/favicon.ico' }
      ]
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Finranks'
    },
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#0b0324' },
      { media: '(prefers-color-scheme: light)', color: '#0b0324' }
    ],
    openGraph: {
      title: 'Finranks — Stock analysis and ranking platform',
      description: 'Discover the true quality of any stock with deep analysis and intuitive rankings.',
      type: 'website',
      siteName: 'Finranks',
      url: 'https://finranks.com',
      images: [
        {
          url: '/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: 'Finranks Logo'
        }
      ]
    },

    robots: {
      index: isProduction,
      follow: isProduction,
      googleBot: {
        index: isProduction,
        follow: isProduction,
      },
    },
  };
}


type RootLayoutProperties = {
  readonly children: ReactNode;
};


export default async function RootLayout({ children }: RootLayoutProperties) {
  const deviceInfo = getDeviceType(await headers());
  const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;

  return (
    <html lang="en" data-device={isMobile ? 'mobile' : 'desktop'}>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body
        className={` ${inter.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MH9FFL9G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
