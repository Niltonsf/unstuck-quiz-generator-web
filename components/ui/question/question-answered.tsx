import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Question } from '@/models/question'

interface QuestionAnsweredItem extends Question {
  selectedAnswer: string
}

interface QuestionAnsweredProps {
  question: QuestionAnsweredItem
}

const QuestionAnswered = ({ question }: QuestionAnsweredProps) => {
  return (
    <RadioGroup value={question.selectedAnswer}>
      {question.options.map((option, index) => {
        const isSelected = question.selectedAnswer === option.value
        const isCorrectAnswer = question.correctAnswer === option.value

        return (
          <label
            key={`${question.selectedAnswer}-${index}`}
            htmlFor={question.selectedAnswer}
            className={cn(
              'flex items-center space-x-2 bg-input-background h-[54px] rounded-lg px-5 transition-colors duration-200 ease-in-out border-input-background border cursor-default',
              isSelected && 'bg-primary/10 border-primary',
              isCorrectAnswer && isSelected && 'bg-green-50 border-green-500',
              !isCorrectAnswer && isSelected && 'bg-red-50 border-red-500',
            )}
          >
            <RadioGroupItem
              id={option.value}
              value={option.value}
              disabled={true}
              className={cn(
                isCorrectAnswer &&
                  isSelected &&
                  'data-[state=checked]:border-green-500',
                !isCorrectAnswer &&
                  isSelected &&
                  'data-[state=checked]:border-red-500',
              )}
            />

            <Label htmlFor={question.selectedAnswer}>{option.label}</Label>
          </label>
        )
      })}
    </RadioGroup>
  )
}

export default QuestionAnswered
