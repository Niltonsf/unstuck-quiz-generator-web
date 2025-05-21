'use client'

import React from 'react'
import { UpgradeDialog } from '../ui/upgrade-dialog'

interface HeaderProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ left, right }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {left ?? null}
      {right ?? <UpgradeDialog />}
    </div>
  )
}

export { Header }
