import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Question } from '@/models/question'
import { Answer } from '@/models/answer'

interface QuestionOptionsProps {
  currentQuestion: Question
  onSelect: (value: string) => void
  selected: string
  disabled: boolean
  answer: Answer
}

const QuestionOptions = ({
  currentQuestion,
  onSelect,
  selected,
  disabled,
  answer,
}: QuestionOptionsProps) => {
  const hasAnswered = !!answer

  return (
    <RadioGroup value={selected} onValueChange={onSelect}>
      {currentQuestion?.options.map((option, index) => {
        const isOptionCorrect = answer?.correctAnswers.includes(option.value)
        const isUserSelection = option.value === selected
        const isUserCorrect = answer?.isCorrect

        const shouldShowGreen =
          hasAnswered && isOptionCorrect && (isUserCorrect || !isUserSelection)
        const shouldShowRed =
          hasAnswered && !isUserCorrect && isUserSelection && !isOptionCorrect

        return (
          <div
            key={`${currentQuestion.id}-${option.value}-${index}`}
            onClick={() => onSelect(option.value)}
            className={cn(
              'flex items-center space-x-2 bg-input-background h-[54px] rounded-lg px-5 cursor-pointer transition-colors duration-200 ease-in-out border-input-background border',
              isUserSelection && 'bg-primary/10 border-primary',

              !disabled && 'hover:bg-primary/10 pointer-events-auto',
              disabled && 'cursor-not-allowed pointer-events-none',

              shouldShowGreen && 'bg-green-100 border-green-500',
              shouldShowRed && 'bg-red-100 border-red-500',
            )}
          >
            <RadioGroupItem
              id={`${currentQuestion.id}-${option.value}`}
              value={option.value}
              disabled={disabled}
              className={cn(
                shouldShowGreen && 'border-green-500!',
                shouldShowRed && 'border-red-500!',
              )}
            />

            <Label
              htmlFor={option.value}
              className={cn(
                !disabled && 'cursor-pointer',
                disabled && 'cursor-not-allowed',
                shouldShowGreen && 'text-green-600',
                shouldShowRed && 'text-red-600',
              )}
            >
              {option.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

export default QuestionOptions
