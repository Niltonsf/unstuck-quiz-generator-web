import React from 'react'
import { CardHeader } from '@/components/ui/card'

interface QuestionHeaderProps {
  question: string
  questionNumber: number
}

const QuestionHeader = ({ question, questionNumber }: QuestionHeaderProps) => {
  return (
    <CardHeader className="flex flex-col gap-3 p-0">
      <p>Question {questionNumber}</p>

      <div className="p-5 bg-neutral-100 rounded-md border border-gray-200/30 w-full">
        <p className="font-medium text-zinc-700">{question}</p>
      </div>
    </CardHeader>
  )
}

export default QuestionHeader
