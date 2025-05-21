'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import LogoTitle from '@/components/ui/logo-title'
import Question from '@/components/ui/question/question'
import QuestionHeader from '@/components/ui/question/question-header'
import { Separator } from '@/components/ui/separator'
import QuestionReviewOption from '@/components/ui/question/question-review-option'
import { useRouter } from 'next/navigation'
import LoadingOverlay from '@/components/layout/loading-overlay'
import { ReviewHeader } from '@/components/review/review-header'
import { useQuizStore } from '@/store/use-quiz-store'
import { QuestionHeaderQuestion } from '@/components/ui/question/question-header-question'
import { handleError } from '@/lib/error-handler'
import { Question as QuestionType } from '@/models/question'
import { QuestionService } from '@/services/question-service'
import { useMutation } from '@tanstack/react-query'

const ReviewPage = () => {
  const router = useRouter()

  const {
    isEncrypted,
    setIsEncrypted,
    questions,
    updateQuestion,
    setQuestions,
  } = useQuizStore()

  const decryptMutation = useMutation({
    mutationFn: () => QuestionService.decryptQuiz(questions),
    onSuccess: (data) => {
      setQuestions(data)
    },
    onError: handleError,
    onSettled: () => {
      setTimeout(() => setIsEncrypted(false), 300)
    },
  })

  const createQuizMutation = useMutation({
    mutationFn: () => QuestionService.createQuiz(questions),
    onSuccess: (data) => {
      setQuestions(data)

      router.push('/quiz')
    },
    onError: handleError,
    onSettled: () => {
      setTimeout(() => setIsEncrypted(true), 300)
    },
  })

  const onQuizStart = () => {
    createQuizMutation.mutate(undefined)
  }

  const onOptionTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: QuestionType,
    optionIndex: number,
  ) => {
    const value = e.target.value

    const updatedOptions = question.options.map((option, index) => {
      if (index === optionIndex) {
        return { ...option, label: value }
      }

      return option
    })

    updateQuestion(question.id, {
      options: updatedOptions,
    })
  }

  useEffect(() => {
    if (
      isEncrypted &&
      !decryptMutation.isPending &&
      !decryptMutation.isSuccess
    ) {
      decryptMutation.mutate(undefined)
    }
  }, [decryptMutation, isEncrypted])

  if (createQuizMutation?.isPending || decryptMutation?.isPending) {
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

          {questions.map((question) => (
            <Question key={question.id}>
              <QuestionHeader questionNumber={question.questionNumber}>
                <QuestionHeaderQuestion question={question.question} />
              </QuestionHeader>

              <Separator />

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium mb-3">
                  {question.answer.length > 1 ? 'Multichoice' : 'Singlechoise'}{' '}
                  Answers
                </span>

                {question.options.map((option, optionIndex) => (
                  <QuestionReviewOption
                    key={`${question.id}-option-${optionIndex}`}
                    optionNumber={optionIndex + 1}
                    answer={option.label}
                    isCorrectAnswer={question?.answer?.includes(option.value)}
                    onDoubleClick={() => {
                      updateQuestion(question.id, {
                        answer: [option.value],
                      })
                    }}
                    onTextChange={(e) =>
                      onOptionTextChange(e, question, optionIndex)
                    }
                  />
                ))}
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
