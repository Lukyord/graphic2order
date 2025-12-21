'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

import LocaleSwitcher from './LocaleSwitcher'
import HeaderMenuCtrl from './HeaderMenuCtrl'

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
                      Our Work
                    </Link>
                  </li>
                  <li>
                    <Link href="/service" onClick={closeMenu}>
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" onClick={closeMenu}>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={closeMenu}>
                      About Us
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
            <span>Get In Touch</span>
          </Link>

          <HeaderMenuCtrl isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  )
}
