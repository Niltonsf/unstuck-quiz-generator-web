'use client'

import React, { useEffect } from 'react'
import { HomeDragAndDropCard } from '@/components/home/home-drag-and-drop-card'
import LoadingOverlay from '@/components/layout/loading-overlay'
import LogoTitle from '@/components/ui/logo-title'
import { useRouter } from 'next/navigation'
import { QuestionService } from '@/services/question-service'
import { handleError } from '@/lib/error-handler'
import { useQuizStore } from '@/store/use-quiz-store'
import { useMutation } from '@tanstack/react-query'

const HomePage = () => {
  const route = useRouter()

  const { setQuestions, setTitle, reset } = useQuizStore()

  const submitFileMuttation = useMutation({
    mutationFn: (file: File) => QuestionService.generateQuestions(file),
    onSuccess: (data) => {
      setQuestions(data.questions)
      setTitle(data.title)

      route.push('/review')
    },
    onError: (error) => handleError(error),
  })

  useEffect(() => {
    reset()
  }, [reset])

  if (submitFileMuttation.isPending) {
    return (
      <LoadingOverlay
        title={'Generating Quiz Questions'}
        subtitle={'Reading your materials...'}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[700px] mx-5">
        <div className="flex items-center flex-col gap-3.5 mb-7">
          <LogoTitle title="Unstuck Quiz Generator" />

          <span className="text-muted-foreground max-w-[542px] text-center">
            Generate quiz quiz your course materials, or textbooks to help you
            study faster and smarter.
          </span>
        </div>

        <HomeDragAndDropCard
          onSubmitFile={(file) => submitFileMuttation.mutate(file)}
        />
      </div>
    </div>
  )
}

export default HomePage
