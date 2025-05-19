import React from 'react'
import Logo from '@/assets/svg/logo.svg'
import Image from 'next/image'
import { HomeDragAndDropCard } from '@/components/home/home-drag-and-drop-card'

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[700px] mx-5">
        <div className="flex items-center flex-col gap-3.5 mb-7">
          <div className="flex items-center gap-3.5 sm:flex-row flex-col">
            <Image priority src={Logo} alt="Logo" className="w-[38px]" />

            <span className="text-4xl font-semibold text-center">
              Unstuck Quiz Generator
            </span>
          </div>

          <span className="text-muted-foreground max-w-[542px] text-center">
            Generate quiz quiz your course materials, or textbooks to help you
            study faster and smarter.
          </span>
        </div>

        <HomeDragAndDropCard />
      </div>
    </div>
  )
}

export default HomePage
