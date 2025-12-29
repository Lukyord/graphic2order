import React from 'react'
import type { Metadata } from 'next'

import '@/styles/global.css'
import '@/styles/global-rwd.css'
import '@/styles/theme.css'
import '@/styles/theme-rwd.css'
import '@/styles/iconfont.css'
import 'lenis/dist/lenis.css'

import { Prompt } from 'next/font/google'

import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Locale, routing } from '@/i18n/routing'

import { SafariProvider } from '@/app/context/SafariContext'
import Header from '@/components/header/Header'
import Theme from '@/components/theme'
import LenisProvider from '@/components/LenisProvider'
import CursorFollower from '@/components/common/cursor-follower'
import Footer from '@/components/footer/Footer'

const prompt = Prompt({
    subsets: ['latin'],
    variable: '--font-prompt',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
    title: 'Graphic 2 Order',
    description: 'Graphic 2 Order',
}

type Props = {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <html lang={locale}>
            <NextIntlClientProvider>
                <SafariProvider>
                    <LenisProvider>
                        <body className={`${prompt.variable}`}>
                            <div id="page">
                                <Header />
                                <Theme />
                                <CursorFollower />
                                {children}
                                <Footer locale={locale as Locale} />
                            </div>
                        </body>
                    </LenisProvider>
                </SafariProvider>
            </NextIntlClientProvider>
        </html>
    )
}
