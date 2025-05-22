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
  label: {
    large: string
    small: string
  }
}

const QuestionBadge = ({ status }: QuestionBadgeProps) => {
  const statusStyles: Record<QuestionStatus, StatusStyles> = {
    CORRECT: {
      bg: 'bg-green-100',
      border: 'border-green-300',
      text: 'text-green-600',
      icon: <Check size={14} className="text-green-600" />,
      label: { large: 'Correct Answer', small: 'Correct' },
    },
    INCORRECT: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-600',
      icon: <X size={14} className="text-red-600" />,
      label: { large: 'Wrong Answer', small: 'Wrong' },
    },
    PARTIAL: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-700',
      icon: <Minus size={14} className="text-yellow-700" />,
      label: { large: 'Partially Correct', small: 'Partial' },
    },
  }

  const style = statusStyles[status]

  return (
    <div
      className={cn(
        'flex items-center h-8 rounded-md mr-2.5 border gap-1.5 px-2.5',
        style.bg,
        style.border,
      )}
    >
      {style.icon}

      <span className={cn('text-xs font-medium', style.text)}>
        <span className="sm:inline hidden">{style.label.large}</span>
        <span className="sm:hidden inline">{style.label.small}</span>
      </span>
    </div>
  )
}

export { QuestionBadge }
