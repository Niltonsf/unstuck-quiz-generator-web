import React from 'react'
import { QuestionBadge } from './question-correct-badge'

interface QuestionReviewOptionProps {
  optionNumber: number
  answer: string
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDoubleClick: () => void
  isCorrectAnswer?: boolean
}

const QuestionReviewOption = ({
  optionNumber,
  answer,
  onTextChange,
  onDoubleClick,
  isCorrectAnswer,
}: QuestionReviewOptionProps) => {
  return (
    <div className="p-0 flex sm:items-center items-start gap-2.5 sm:flex-row flex-col">
      <p className="text-nowrap text-sm font-medium">Option {optionNumber}:</p>

      <div
        onDoubleClick={onDoubleClick}
        className="relative flex bg-input-background border-none rounded-md shadow-none focus-within:bg-primary/8 focus-within:ring-primary/20 caret-primary items-center h-[51px] w-full"
      >
        <input
          type="text"
          value={answer}
          onChange={onTextChange}
          className="flex flex-1 bg-transparent border-none outline-none px-5 h-full font-medium"
        />

        {isCorrectAnswer && <QuestionBadge isCorrect />}
      </div>
    </div>
  )
}

export default QuestionReviewOption
