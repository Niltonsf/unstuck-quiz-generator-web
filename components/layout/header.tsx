'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'

interface HeaderProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ left, right }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {left ?? null}
      {right ?? (
        <Button className="bg-black hover:bg-black/60">
          <Zap />
          <span className="hidden sm:inline">Upgrade</span>
        </Button>
      )}
    </div>
  )
}

export { Header }
