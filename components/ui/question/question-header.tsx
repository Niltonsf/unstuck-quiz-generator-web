import React from 'react'
import { CardHeader } from '@/components/ui/card'
import { QuestionBadge } from './question-correct-badge'

interface QuestionHeaderProps {
  questionNumber: number
  isCorrect?: boolean
  children?: React.ReactNode
}

const QuestionHeader = ({
  questionNumber,
  children,
  isCorrect,
}: QuestionHeaderProps) => {
  return (
    <CardHeader className="flex flex-col gap-3 p-0">
      <div className="flex w-full items-center justify-between">
        <p>Question {questionNumber}</p>

        {isCorrect !== undefined && <QuestionBadge isCorrect={isCorrect} />}
      </div>

      {children}
    </CardHeader>
  )
}

export default QuestionHeader
