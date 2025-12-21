'use client'

import { Locale, locales } from '@/i18n/routing'
import { usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import Popup from '../common/popup/popup'
import PopupTrigger from '../common/popup/popup-trigger'
import PopupContent from '../common/popup/popup-content'

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
    <Popup position="center">
      <PopupTrigger>
        <span className="popup-trigger-text uppercase">{locale}</span>
        <i className="ic ic-chevron-down size-icon-4xs"></i>
      </PopupTrigger>

      <PopupContent>
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
      </PopupContent>
    </Popup>
  )
}
