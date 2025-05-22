import React, { useEffect, useMemo, useState } from 'react'
import CorrectAnswer from '@/assets/svg/correct-answer.svg'
import PartySymbols from '@/assets/svg/results/party-symbols.svg'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Share } from 'lucide-react'
import { ScoreBar } from '../ui/score-bar/score-bar'

interface ResultsCongratulationCardProps {
  totalCorrectAnswers: number
}

const ResultsCongratulationCard = ({
  totalCorrectAnswers,
}: ResultsCongratulationCardProps) => {
  const [name, setName] = useState('')
  const totalCorrectAnswersToFixed = totalCorrectAnswers?.toFixed(1)

  const shareToLinkedIn = () => {
    const shareText = `I scored ${totalCorrectAnswersToFixed}/10 on this quiz generator! 🎉 Try it yourself https://www.unstuck-quiz.com`
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${shareText}`

    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }

  const messageByScore = useMemo(() => {
    if (totalCorrectAnswers === 10) {
      return `Outstanding, ${name}! You aced the quiz with a perfect score!`
    } else if (totalCorrectAnswers >= 8) {
      return `Great job, ${name}! You really know your stuff.`
    } else if (totalCorrectAnswers >= 5) {
      return `Well done, ${name}! You’re on the right track. Keep it up!`
    } else if (totalCorrectAnswers >= 3) {
      return `Good effort, ${name}. A bit more practice and you’ll get there!`
    } else {
      return `Don't give up, ${name}. Every expert was once a beginner.`
    }
  }, [name, totalCorrectAnswers])

  useEffect(() => {
    const savedName = localStorage.getItem('@unstuckquiz:name')

    if (savedName) {
      setName(savedName || 'John Doe')
    }
  }, [])

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
          {messageByScore}
        </span>

        <span className="text-center mt-9 text-[56px] font-semibold">
          {totalCorrectAnswersToFixed}/10
        </span>

        <ScoreBar correct={totalCorrectAnswers} total={10} className="mt-5" />
      </div>

      <Button className="h-10 w-40 mt-7" onClick={shareToLinkedIn}>
        Share results
        <Share />
      </Button>
    </div>
  )
}

export { ResultsCongratulationCard }
