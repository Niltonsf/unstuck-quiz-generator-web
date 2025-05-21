import React, { useEffect, useState } from 'react'
import { Progress } from './progress'
import { toast } from 'sonner'

interface ToastProgressProps {
  interval: number
  seconds: number
  toastId?: string | number
  title?: string
}

const ToastProgress = ({
  interval,
  seconds,
  toastId,
  title,
}: ToastProgressProps) => {
  const [count, setCount] = useState(seconds)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (count === 0) {
      toast.dismiss(toastId)
      return
    }

    const countInterval = setInterval(() => {
      setCount((c) => c - 1)
    }, interval || 1000)

    return () => clearInterval(countInterval)
  }, [count, interval, toastId])

  useEffect(() => {
    if (progress >= 100) return

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / ((seconds * 1000) / 100), 100))
    }, 100)

    return () => clearInterval(progressInterval)
  }, [progress, seconds])

  return (
    <div className="w-80 p-4 space-y-2 border rounded-md bg-card">
      <div className="text-start font-medium text-gray-900 text-xs">
        {title || 'Redirecting in'} {count} seconds...
      </div>

      <Progress value={progress} className="h-2 rounded-full" />
    </div>
  )
}

export default ToastProgress
