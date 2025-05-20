import React, { HTMLAttributes } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface QuestionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Question = ({ children, className, ...rest }: QuestionProps) => (
  <Card className={cn('w-full p-5 gap-7 shadow-none', className)} {...rest}>
    {children}
  </Card>
)

export default Question
