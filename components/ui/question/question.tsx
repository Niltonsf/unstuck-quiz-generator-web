import React from 'react'
import { Card } from '@/components/ui/card'

const Question = ({ children }: { children: React.ReactNode }) => (
  <Card className="w-full p-5 gap-7 shadow-none">{children}</Card>
)

export default Question
