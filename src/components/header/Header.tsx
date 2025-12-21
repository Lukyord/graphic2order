'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

import LocaleSwitcher from './LocaleSwitcher'
import HeaderMenuCtrl from './HeaderMenuCtrl'
import { useTranslations } from 'next-intl'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('header-menu-enabled')
    } else {
      document.documentElement.classList.remove('header-menu-enabled')
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const tHeaderMenu = useTranslations('Header.menu')
  const tGeneralButton = useTranslations('General.Button')

  return (
    <header id="header" ref={headerRef}>
      <div className="header-nav">
        <div className="header-brand">
          <Link href="/" className="brand" onClick={closeMenu}>
            <Image
              src="/media/logo.svg"
              alt="Graphic2Order Logo"
              className="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <nav className="header-menu">
          <div className="panel">
            <div className="panel-scroll" data-lenis-prevent>
              <div className="panel-body">
                <ul className="menu">
                  <li>
                    <Link href="/work" onClick={closeMenu}>
                      {tHeaderMenu('work')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service" onClick={closeMenu}>
                      {tHeaderMenu('services')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" onClick={closeMenu}>
                      {tHeaderMenu('pricing')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={closeMenu}>
                      {tHeaderMenu('about')}
                    </Link>
                  </li>
                  <li>
                    <LocaleSwitcher />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="button">
            <span>{tGeneralButton('get-in-touch')}</span>
          </Link>

          <HeaderMenuCtrl isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  )
}
