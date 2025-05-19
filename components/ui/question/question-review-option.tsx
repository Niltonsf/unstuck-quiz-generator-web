import React from 'react'
import { Check } from 'lucide-react'

interface QuestionReviewOptionProps {
  questionNumber: number
  isCorrectAnswer?: boolean
}

const QuestionReviewOption = ({
  questionNumber,
  isCorrectAnswer,
}: QuestionReviewOptionProps) => {
  return (
    <div className="p-0 flex sm:items-center items-start gap-2.5 sm:flex-row flex-col">
      <p className="text-nowrap text-sm font-medium">
        Option {questionNumber}:
      </p>

      <div className="relative flex bg-input-background border-none rounded-md shadow-none focus-within:bg-primary/8 focus-within:ring-primary/20 caret-primary items-center h-[51px] w-full">
        <input
          type="text"
          className="flex flex-1 bg-transparent border-none outline-none px-5 h-full font-medium"
        />

        {isCorrectAnswer && (
          <div className="flex items-center bg-green-100 h-8 rounded-md mr-2.5 border border-green-300 gap-1.5 px-2.5">
            <Check size={14} className="text-green-600" />

            <span className="text-xs text-green-600 font-medium">
              <span className="sm:inline hidden">Correct Answer</span>

              <span className="sm:hidden inline">Correct</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionReviewOption
