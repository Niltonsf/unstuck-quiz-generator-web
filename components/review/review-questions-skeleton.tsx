import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ReviewQuestionsSkeleton = () => {
  return (
    <div className="max-w-3xl w-full h-[500px] space-y-4 rounded-lg">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Skeleton key={idx} className="h-full w-full" />
      ))}
    </div>
  )
}

export { ReviewQuestionsSkeleton }
