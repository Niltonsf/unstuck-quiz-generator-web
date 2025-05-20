'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import LogoTitle from '@/components/ui/logo-title'
import Question from '@/components/ui/question/question'
import QuestionHeader from '@/components/ui/question/question-header'
import { Separator } from '@/components/ui/separator'
import QuestionReviewOption from '@/components/ui/question/question-review-option'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import LoadingOverlay from '@/components/layout/loading-overlay'
import { ReviewHeader } from '@/components/review/review-header'

const questions = [
  'What innovative tool did Jake Harper develop to assist students with admissions into competitive academic majors at the University of Washington?',
]

const ReviewPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onQuizStart = async () => {
    try {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 5000))

      router.push('/quiz')
    } catch {
      toast('Something went wrong, please try again')
    } finally {
      setTimeout(() => setLoading(false), 300)
    }
  }

  if (loading) {
    return (
      <LoadingOverlay
        title={'Preparing Quiz for Practise'}
        subtitle={'Preparing the quiz so you can now pratice...'}
      />
    )
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-32">
        <ReviewHeader />

        <div className="flex self-center w-full max-w-3xl mt-5 h-full items-start flex-col gap-5 px-4 sm:px-6">
          <LogoTitle
            title="Review & Edit Questions"
            titleClassName="text-3xl"
            wrapperClassName="mb-2.5 sm:self-start self-center"
            logoSize={31}
          />

          {questions.map((questionText, index) => (
            <Question key={index}>
              <QuestionHeader
                question={questionText}
                questionNumber={index + 1}
              />

              <Separator />

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium mb-3">
                  Multichoice Answers
                </span>

                <QuestionReviewOption questionNumber={1} isCorrectAnswer />
                <QuestionReviewOption questionNumber={2} />
                <QuestionReviewOption questionNumber={3} />
              </div>
            </Question>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/100 to-transparent pointer-events-none z-10" />

      <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-20">
        <Button size="lg" className="px-8" onClick={onQuizStart}>
          Start Quiz
        </Button>
      </div>
    </div>
  )
}

export default ReviewPage
