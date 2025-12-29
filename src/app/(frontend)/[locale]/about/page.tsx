import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    return <div>About</div>
}
