import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import React from 'react'

interface QuestionBadgeProps {
  isCorrect?: boolean
}

const QuestionBadge = ({ isCorrect }: QuestionBadgeProps) => {
  const textBiggerScreens = isCorrect ? 'Correct Answer' : 'Wrong Answer'
  const textSmallerScreens = isCorrect ? 'Correct' : 'Wrong'

  return (
    <div
      className={cn(
        'flex items-center h-8 rounded-md mr-2.5 border gap-1.5 px-2.5',
        isCorrect
          ? 'bg-green-100 border-green-300'
          : 'bg-red-100 border-red-300',
      )}
    >
      {isCorrect ? (
        <Check size={14} className="text-green-600" />
      ) : (
        <X size={14} className="text-red-600" />
      )}

      <span
        className={cn(
          'text-xs font-medium',
          isCorrect ? 'text-green-600' : 'text-red-600',
        )}
      >
        <span className="sm:inline hidden">{textBiggerScreens}</span>

        <span className="sm:hidden inline">{textSmallerScreens}</span>
      </span>
    </div>
  )
}

export { QuestionBadge }
