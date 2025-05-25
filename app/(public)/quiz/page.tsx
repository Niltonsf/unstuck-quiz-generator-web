'use client'

import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/store/use-quiz-store'
import { toast } from 'sonner'
import { QuizHeader } from '@/components/quiz/quiz-header'
import { handleError } from '@/utils/error-handler'
import ToastProgress from '@/components/ui/toast-progress'
import QuizQuestion from '@/components/quiz/quiz-question'
import { QuestionService } from '@/services/question-service'

const QuizPage = () => {
  const router = useRouter()
  const {
    title,
    questions,
    currentIndex,
    next,
    answerQuestion,
    previous,
    resetQuiz,
  } = useQuizStore()

  const [isWaiting, setIsWaiting] = useState(false)

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [currentIndex, questions],
  )
  const myAnswers = currentQuestion?.myAnswers || []
  const isLastQuestion = currentIndex === questions?.length - 1
  const isQuestionAnswered =
    !!currentQuestion?.myAnswers?.length && 'isCorrect' in currentQuestion

  const onGoBack = () => {
    resetQuiz()
    router.back()
  }

  const handleNext = async () => {
    try {
      if (isWaiting) {
        return
      }

      if (myAnswers?.length === 0 || !myAnswers) {
        toast('Please select an answer before continuing.')
        return
      }

      if (isQuestionAnswered) {
        next()

        if (isLastQuestion) {
          router.push('/results')
        }

        return
      }

      const validatedAnswerResult = await QuestionService.validateAnswer(
        currentQuestion,
        myAnswers,
      )

      toast.custom((toastId) => (
        <ToastProgress
          interval={1000}
          seconds={3}
          toastId={toastId}
          title={isLastQuestion ? 'Results in' : 'Next question in'}
        />
      ))

      answerQuestion(currentQuestion?.id, myAnswers, validatedAnswerResult)

      setIsWaiting(true)

      setTimeout(() => {
        setIsWaiting(false)

        next()

        if (isLastQuestion) {
          router.push('/results')
        }
      }, 3000)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-10 mx-5">
        <QuizHeader title={title} onGoBack={onGoBack} />

        <div className="max-w-3xl w-full flex flex-1 flex-col self-center">
          <div className="flex flex-1 w-full items-center justify-center my-3 flex-col gap-6">
            {!currentQuestion ? (
              <div className="text-gray-500 text-center text-sm">
                No current question available. Please wait or try again later.
              </div>
            ) : (
              <QuizQuestion
                currentQuestion={currentQuestion}
                isWaiting={isWaiting}
              />
            )}
          </div>

          <div className="flex w-full items-center justify-between max-w-3xl">
            <Button
              variant={'outline'}
              className="h-11 rounded-2xl"
              onClick={previous}
              disabled={currentIndex === 0 || isWaiting || !currentQuestion}
            >
              <ChevronLeft />
              Previous
            </Button>

            <Button
              className="h-11 rounded-2xl w-24 self-end"
              onClick={handleNext}
              disabled={isWaiting || !currentQuestion}
            >
              {isLastQuestion ? 'Finish' : 'Next'}

              {!isLastQuestion && <ChevronRight />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
