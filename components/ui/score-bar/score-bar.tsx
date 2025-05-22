import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'
import { ScoreBarLegend } from './score-bar-legend'

interface ScoreBarProps {
  correct: number
  total: number
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export const ScoreBar = ({ correct, total, className }: ScoreBarProps) => {
  const correctPercentage = (correct / total) * 100
  const incorrectPercentage = 100 - correctPercentage

  return (
    <div
      className={cn(
        'max-w-[402px] w-full flex flex-col items-center',
        className,
      )}
    >
      <div
        className={
          'w-full h-2.5 rounded-full overflow-hidden bg-muted flex gap-1.5'
        }
      >
        <div
          className="bg-green-muted transition-all duration-300 rounded-2xl"
          style={{ width: `${correctPercentage}%` }}
        />

        <div
          className="bg-red-muted transition-all duration-300 rounded-2xl"
          style={{ width: `${incorrectPercentage}%` }}
        />
      </div>

      <div className="flex items-center gap-5 mt-7 self-center sm:flex-row flex-col">
        <ScoreBarLegend color="bg-green-muted" label="Answered Correctly" />

        <ScoreBarLegend color="bg-red-muted" label="Missed answers" />
      </div>
    </div>
  )
}
