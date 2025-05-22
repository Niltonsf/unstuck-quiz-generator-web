import React from 'react'
import { CardHeader } from '@/components/ui/card'
import { QuestionBadge } from './question-badge'
import { QuestionStatus } from '@/models/question'

interface QuestionHeaderProps {
  questionNumber: number
  status?: QuestionStatus
  isMultipleChoice?: boolean
  children?: React.ReactNode
}

const QuestionHeader = ({
  questionNumber,
  children,
  status,
  isMultipleChoice,
}: QuestionHeaderProps) => {
  return (
    <CardHeader className="flex flex-col gap-3 p-0">
      <div className="flex w-full items-center justify-between">
        <div>
          <p>Question {questionNumber}</p>

          {isMultipleChoice && (
            <div className="text-sm text-blue-600 font-medium">
              This is a multiple choice question. Select all that apply.
            </div>
          )}
        </div>

        {status !== undefined && <QuestionBadge status={status} />}
      </div>

      {children}
    </CardHeader>
  )
}

export default QuestionHeader
