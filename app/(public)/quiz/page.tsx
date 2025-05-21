'use client'

import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Question from '@/components/ui/question/question'
import QuestionHeader from '@/components/ui/question/question-header'
import { Separator } from '@/components/ui/separator'
import QuestionOptions from '@/components/ui/question/question-options'
import { useQuizStore } from '@/store/use-quiz-store'
import { toast } from 'sonner'
import { QuizCorrectAnswer } from '@/components/quiz/quiz-correct-answer'
import { QuizHeader } from '@/components/quiz/quiz-header'
import { QuestionHeaderQuestion } from '@/components/ui/question/question-header-question'
import { QuestionService } from '@/services/question-service'
import { handleError } from '@/lib/error-handler'
import ToastProgress from '@/components/ui/toast-progress'

const QuizPage = () => {
  const router = useRouter()

  const {
    title,
    questions,
    currentIndex,
    next,
    answers,
    selectedOptions,
    answerQuestion,
    previous,
    resetQuiz,
  } = useQuizStore()

  const [cooldown, setCooldown] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [currentIndex, questions],
  )
  const selectedAnswer = selectedOptions[currentQuestion?.id]
  const isLastQuestion = currentIndex === questions.length - 1
  const answer = answers[currentQuestion?.id]

  const onGoBack = () => {
    resetQuiz()
    router.back()
  }

  const handleNext = async () => {
    try {
      if (cooldown) {
        return
      }

      if (!selectedAnswer) {
        toast('Please select an answer before continuing.')
        return
      }

      if (answer) {
        next()

        if (isLastQuestion) {
          router.push('/results')
        }
        return
      }

      const validatedAnswerResult = await QuestionService.validateAnswer(
        currentQuestion,
        selectedAnswer,
      )

      toast.custom((toastId) => (
        <ToastProgress
          interval={1000}
          seconds={3}
          toastId={toastId}
          title="Next question in"
        />
      ))

      answerQuestion(currentQuestion.id, selectedAnswer, validatedAnswerResult)

      setShowFeedback(true)
      setCooldown(true)

      setTimeout(() => {
        setShowFeedback(false)
        setCooldown(false)
        next()

        if (isLastQuestion) {
          router.push('/results')
        }
      }, 3000)
    } catch (error) {
      console.log('page: ', error)
      handleError(error)
    }
  }

  if (!currentQuestion) {
    return <></>
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-10 mx-5">
        <QuizHeader title={title} onGoBack={onGoBack} />

        <div className="max-w-3xl w-full flex flex-1 flex-col self-center">
          <div className="flex flex-1 w-full items-center justify-center my-3 flex-col gap-6">
            <Question>
              <QuestionHeader questionNumber={currentIndex + 1}>
                <QuestionHeaderQuestion question={currentQuestion.question} />
              </QuestionHeader>

              <Separator />

              <QuestionOptions
                currentQuestion={currentQuestion}
                selected={selectedOptions[currentQuestion.id]}
                onSelect={(value) => answerQuestion(currentQuestion.id, value)}
                disabled={!!answer || showFeedback}
                answer={answer}
              />
            </Question>

            {(showFeedback || !!answer) && answer.isCorrect && (
              <QuizCorrectAnswer />
            )}
          </div>

          <div className="flex w-full items-center justify-between max-w-3xl">
            <Button
              variant={'outline'}
              className="h-11 rounded-2xl"
              onClick={previous}
              disabled={currentIndex === 0}
            >
              <ChevronLeft />
              Previous
            </Button>

            <Button
              className="h-11 rounded-2xl w-24 self-end"
              onClick={handleNext}
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
