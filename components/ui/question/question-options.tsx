import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Question } from '@/models/question'

interface QuestionOptionsProps {
  currentQuestion: Question
  disabled: boolean
  onSelect?: (value: string) => void
}

const QuestionOptions = ({
  currentQuestion,
  onSelect,
  disabled,
}: QuestionOptionsProps) => {
  const hasAnswered = 'isCorrect' in currentQuestion
  const isUserCorrect = currentQuestion?.isCorrect
  const userAnswers = currentQuestion?.myAnswers || []

  return (
    <div className="flex flex-col gap-2">
      {currentQuestion?.options?.map((option, index) => {
        const isOptionCorrect = currentQuestion?.answers?.includes(option.value)
        const isUserSelection = userAnswers?.includes(option.value)

        const isCorrectButNotSelected =
          hasAnswered && !isUserSelection && isOptionCorrect && !isUserCorrect

        const isCorrect = hasAnswered && isOptionCorrect
        const isIncorrect =
          hasAnswered && !isUserCorrect && isUserSelection && !isOptionCorrect

        return (
          <div
            key={`${currentQuestion.id}-${option.value}-${index}`}
            onClick={() => !disabled && onSelect && onSelect(option.value)}
            className={cn(
              'flex items-center space-x-2 bg-input-background h-[54px] rounded-lg px-5 cursor-pointer transition-colors duration-200 ease-in-out border-input-background border',
              isUserSelection && 'bg-primary/10 border-primary',

              !disabled && 'hover:bg-primary/10 pointer-events-auto',
              disabled && 'cursor-not-allowed pointer-events-none',

              isCorrect && 'bg-green-100 border-green-500',
              isIncorrect && 'bg-red-100 border-red-500',
            )}
          >
            <Checkbox
              id={`${currentQuestion.id}-${option.value}`}
              checked={isUserSelection}
              className={cn(
                'h-4 w-4 rounded-md border-3 border-gray-300 bg-transparent data-[state=checked]:border-primary data-[state=checked]:bg-transparent',
                isCorrect && 'border-green-500!',
                isIncorrect && 'border-red-500!',
                isCorrectButNotSelected && 'border-gray-300!',
              )}
            />

            <Label
              htmlFor={option.value}
              className={cn(
                !disabled && 'cursor-pointer',
                disabled && 'cursor-not-allowed',
                isCorrect && 'text-green-600',
                isIncorrect && 'text-red-600',
                isCorrectButNotSelected && 'text-black',
              )}
            >
              {option.label}
            </Label>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionOptions
