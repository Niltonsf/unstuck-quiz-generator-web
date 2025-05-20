import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Option } from '@/models/option'

interface QuestionOptionsProps {
  questions: Option[]
  onSelect: (value: string) => void
  selected: string
  disabled: boolean
}

const QuestionOptions = ({
  questions,
  onSelect,
  selected,
  disabled
}: QuestionOptionsProps) => {
  return (
    <RadioGroup value={selected} onValueChange={onSelect}>
      {questions.map((question, index) => {
        const isSelected = question.value === selected

        return (
          <label
            key={`${question.value}-${index}`}
            htmlFor={question.value}
            className={cn(
              'flex items-center space-x-2 bg-input-background h-[54px] rounded-lg px-5 cursor-pointer transition-colors duration-200 ease-in-out border-input-background border',
              isSelected && 'bg-primary/10 border-primary',
              !disabled && 'hover:bg-primary/10',
              disabled && 'cursor-not-allowed'
            )}
          >
            <RadioGroupItem value={question.value} id={question.value} disabled={disabled} />
            <Label
              htmlFor={question.value}
              className={cn(
                !disabled && 'hover:bg-primary/10',
                disabled && 'cursor-not-allowed'
              )}
            >
              {question.label}
            </Label>
          </label>
        )
      })}
    </RadioGroup>
  )
}

export default QuestionOptions
