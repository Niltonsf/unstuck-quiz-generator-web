'use client'

import Image from 'next/image'
import React from 'react'
import PDF from '@/assets/svg/pdf.svg'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ResultsHeader } from '@/components/results/results-header'

const ResultsPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-10 mx-5">
        <ResultsHeader title={'Mathematics Quiz'} />
      </div>
    </div>
  )
}

export default ResultsPage
