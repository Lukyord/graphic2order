import { defineRouting } from 'next-intl/routing'

export type Locale = (typeof locales)[number]

export const locales = ['en', 'th'] as const
export const defaultLocale: Locale = 'en'

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  pathnames: {
    '/': '/',
    '/work': '/work',
    '/service': '/service',
    '/pricing': '/pricing',
    '/about': '/about',
  },
})
