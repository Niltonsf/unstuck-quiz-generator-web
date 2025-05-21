import React from 'react'
import CorrectAnswer from '@/assets/svg/correct-answer.svg'
import PartySymbols from '@/assets/svg/results/party-symbols.svg'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Share } from 'lucide-react'
import { DualProgressBar } from '../ui/dual-progress-bar/dual-progress-bar'

interface ResultsCongratulationCardProps {
  totalCorrectAnswers: number
}

const ResultsCongratulationCard = ({ totalCorrectAnswers }: ResultsCongratulationCardProps) => {
  return (
    <div className="flex flex-col items-center py-9 rounded-md border relative">
      <Image src={PartySymbols} alt={'party-symbols'} fill className="z-[-1]" />

      <Image
        priority
        src={CorrectAnswer}
        alt={'correct-answer'}
        className="w-20"
      />

      <div className="flex flex-col items-center mx-5">
        <span className="text-center mt-6 text-2xl font-medium max-w-[450px]">
          Great Work Martinelli, you did very good on your quiz.
        </span>

        <span className="text-center mt-9 text-[56px] font-semibold">{totalCorrectAnswers}/10</span>

        <DualProgressBar correct={totalCorrectAnswers} total={10} className="mt-5" />
      </div>

      <Button className="h-10 w-40 mt-7">
        Share results
        <Share />
      </Button>
    </div>
  )
}

export { ResultsCongratulationCard }
