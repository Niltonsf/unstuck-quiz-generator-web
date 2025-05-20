import React from 'react'

interface QuestionHeaderQuestionProps {
  question: string
}

const QuestionHeaderQuestion = ({ question }: QuestionHeaderQuestionProps) => {
  return (
    <div className="p-5 bg-neutral-100 rounded-md border border-gray-200/30 w-full">
      <p className="font-medium text-zinc-700">{question}</p>
    </div>
  )
}

export { QuestionHeaderQuestion }
