import React, { useRef } from 'react'
import { QuestionBadge } from './question-badge'

interface QuestionReviewOptionProps {
  optionNumber: number
  answer: string
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDoubleClick: () => void
  isCorrectAnswer?: boolean
}

const LONG_PRESS_DURATION = 500

const QuestionReviewOption = ({
  optionNumber,
  answer,
  onTextChange,
  onDoubleClick,
  isCorrectAnswer,
}: QuestionReviewOptionProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handlePressStart = () => {
    timeoutRef.current = setTimeout(() => {
      onDoubleClick()
    }, LONG_PRESS_DURATION)
  }

  const handlePressEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <div
      className="p-0 flex sm:items-center items-start gap-2.5 sm:flex-row flex-col"
      onDoubleClick={onDoubleClick}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
    >
      <p className="text-nowrap text-sm font-medium cursor-pointer">
        Option {optionNumber}:
      </p>

      <div className="relative flex bg-input-background border-none rounded-md shadow-none focus-within:bg-primary/8 focus-within:ring-primary/20 caret-primary items-center h-[51px] w-full">
        <input
          type="text"
          value={answer}
          onChange={onTextChange}
          className="flex flex-1 bg-transparent border-none outline-none px-5 h-full font-medium"
        />

        {isCorrectAnswer && <QuestionBadge status="CORRECT" />}
      </div>
    </div>
  )
}

export default QuestionReviewOption
