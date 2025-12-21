import React from 'react'
import type { Metadata } from 'next'

import '@/styles/global.css'
import '@/styles/global-rwd.css'
import '@/styles/theme.css'
import '@/styles/theme-rwd.css'
import '@/styles/iconfont.css'
import 'lenis/dist/lenis.css'

import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

import Header from '@/components/header/Header'
import Theme from '@/components/theme'
import LenisProvider from '@/components/LenisProvider'

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
        <LenisProvider>
          <body>
            <div id="page">
              <Header />
              <Theme />
              {children}
            </div>
          </body>
        </LenisProvider>
      </NextIntlClientProvider>
    </html>
  )
}
