'use client'

import { setUserLocale } from '@/app/lib/locale'
import { Locale, locales } from '@/i18n/routing'
import { usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'

export default function LocaleSwitcher() {
  const [isPending, setIsPending] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()

  async function onChange(value: Locale) {
    if (value === locale) return

    setIsPending(true)
    const newPath = `/${value}${pathname === '/' ? '' : pathname}`
    window.location.href = newPath
  }

  return (
    <div className="locale-switcher popup">
      <button className="popup-trigger">
        <span className="popup-trigger-text">{locale}</span>
        <i className="ic ic-chevron-down size-icon-4xs"></i>
      </button>

      <div className="popup-content">
        <ul className="popup-option-list">
          {locales.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => onChange(loc)}
                disabled={isPending || loc === locale}
                className={loc === locale ? 'active' : ''}
              >
                {loc.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
