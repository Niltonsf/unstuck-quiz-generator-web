import { cn } from '@/lib/utils'
import { QuestionStatus } from '@/models/question'
import { Check, Minus, X } from 'lucide-react'
import React from 'react'

interface QuestionBadgeProps {
  status: QuestionStatus
}

interface StatusStyles {
  bg: string
  border: string
  text: string
  icon: React.ReactNode
  label: string
}

const QuestionBadge = ({ status }: QuestionBadgeProps) => {
  const statusStyles: Record<QuestionStatus, StatusStyles> = {
    CORRECT: {
      bg: 'bg-green-100',
      border: 'border-green-300',
      text: 'text-green-600',
      icon: <Check size={14} className="text-green-600" />,
      label: 'Correct Answer',
    },
    INCORRECT: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-600',
      icon: <X size={14} className="text-red-600" />,
      label: 'Wrong Answer',
    },
    PARTIAL: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-700',
      icon: <Minus size={14} className="text-yellow-700" />,
      label: 'Partially Correct',
    },
  }

  const style = statusStyles[status]

  if (!style) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center h-8 rounded-md mr-2.5 border gap-1.5 px-2.5',
        style?.bg,
        style?.border,
      )}
    >
      {style?.icon}

      <span className={cn('text-xs font-medium sm:inline hidden', style.text)}>
        <span>{style.label}</span>
      </span>
    </div>
  )
}

export { QuestionBadge }
