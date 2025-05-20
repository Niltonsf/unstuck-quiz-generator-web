import React from 'react'
import PDF from '@/assets/svg/pdf.svg'
import Image from 'next/image'
import { Header } from '../layout/header'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface ResultsHeaderProps {
  title: string
}

const ResultsHeader = ({ title }: ResultsHeaderProps) => {
  const router = useRouter()

  return (
    <Header
      left={
        <Button
          variant={'ghost'}
          className="text-gray-500 gap-3 hover:bg-transparent font-semibold p-0! sm:text-2xl text-xl"
          onClick={() => router.back()}
        >
          <ChevronLeft style={{ width: 24, height: 24 }} />
          <Image priority src={PDF} alt={'pdf'} className="w-6 ml-2" />
          {title}
        </Button>
      }
    />
  )
}

export { ResultsHeader }
