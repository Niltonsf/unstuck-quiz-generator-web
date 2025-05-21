import React from 'react'
import PDF from '@/assets/svg/pdf.svg'
import Image from 'next/image'
import { Header } from '../layout/header'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface QuizHeaderProps {
  title: string
  onGoBack?: () => void
}

const QuizHeader = ({ title, onGoBack }: QuizHeaderProps) => {
  const router = useRouter()

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack()
    } else {
      router.back()
    }
  }

  return (
    <Header
      left={
        <Button
          variant={'ghost'}
          className="text-gray-500 gap-3 hover:bg-transparent font-semibold p-0! sm:text-2xl text-xl"
          onClick={handleGoBack}
        >
          <ChevronLeft style={{ width: 24, height: 24 }} />
          <Image priority src={PDF} alt={'pdf'} className="w-6 ml-2" />
          {title}
        </Button>
      }
    />
  )
}

export { QuizHeader }
