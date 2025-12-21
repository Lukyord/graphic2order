'use client'

import React from 'react'

interface HeaderMenuCtrlProps {
    isMenuOpen: boolean
    setIsMenuOpen: (isOpen: boolean) => void
}

export default function HeaderMenuCtrl({ isMenuOpen, setIsMenuOpen }: HeaderMenuCtrlProps) {
    return (
        <div className="header-menu-ctrl hidden-device-md">
            <button className="menu-ctrl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="hamburger">
                    <span className="bars">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </span>
                </span>
            </button>
        </div>
    )
}
