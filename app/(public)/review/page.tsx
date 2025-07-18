'use client'

import React, { useEffect, useState } from 'react'
import LogoTitle from '@/components/ui/logo-title'
import { useRouter } from 'next/navigation'
import LoadingOverlay from '@/components/layout/loading-overlay'
import { ReviewHeader } from '@/components/review/review-header'
import { useQuizStore } from '@/store/use-quiz-store'
import { handleError } from '@/utils/error-handler'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { FooterFloatingActionButton } from '@/components/ui/footer-floating-action-button'
import ReviewAddNameDialog from '@/components/review/review-add-name-dialog'
import { delay } from '@/utils/time'
import { isProbablyEncrypted } from '@/utils/string'
import { AnimatePresence } from 'framer-motion'
import { ReviewQuestionsSkeleton } from '@/components/review/review-questions-skeleton'
import ReviewQuestions from '@/components/review/review-questions'
import ReviewNoQuestions from '@/components/review/review-no-questions'
import { QuizService } from '@/services/quiz-service'

const ReviewPage = () => {
  const router = useRouter()
  const { questions, setQuestions } = useQuizStore()

  const [isReviewAddNameDialogOpen, setIsReviewAddNameDialogOpen] =
    useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const noQuestions = questions?.length === 0

  const decryptQuestionsMutation = useMutation({
    mutationFn: () => QuizService.decryptQuiz(questions),
    onSuccess: async (data) => {
      await delay(1000)

      setQuestions(data)
    },
    onError: handleError,
  })

  const createQuizMutation = useMutation({
    mutationFn: () => QuizService.createQuiz(questions),
    onSuccess: async (data) => {
      await delay(3000)

      setQuestions(data)
    },
    onError: handleError,
  })

  const shouldRedirectToQuiz =
    createQuizMutation?.isSuccess && animationComplete

  const handleOpenAddNameDialog = () => {
    setIsReviewAddNameDialogOpen(true)
  }

  const onStartQuiz = () => {
    setAnimationComplete(false)

    createQuizMutation.mutate(undefined)
  }

  useEffect(() => {
    const hasEncryptedAnswer = questions.some((question) =>
      question.answers.some((answer) => isProbablyEncrypted(answer)),
    )

    if (
      hasEncryptedAnswer &&
      !decryptQuestionsMutation.isPending &&
      !decryptQuestionsMutation.isSuccess
    ) {
      decryptQuestionsMutation.mutate(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shouldRedirectToQuiz) {
      router.push('/quiz')
    }
  }, [router, shouldRedirectToQuiz])

  if (shouldRedirectToQuiz) {
    return <></>
  }

  return (
    <AnimatePresence mode="wait">
      {createQuizMutation?.isPending ? (
        <LoadingOverlay
          key="loading-overlay-review"
          title={'Preparing Quiz for Practise'}
          subtitle={'Preparing the quiz so you can now pratice...'}
          onAnimationEnd={() => setAnimationComplete(true)}
        />
      ) : (
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

              <Alert>
                <Info>Heads up!</Info>
                <AlertDescription>
                  Double-click or press and hold an option to mark it as
                  correct. Repeat the action to unmark it.
                  <br />
                  <strong>
                    Note: Each question must have at least one correct answer
                    and a maximum of 3.
                  </strong>
                </AlertDescription>
              </Alert>

              {decryptQuestionsMutation.isPending ? (
                <ReviewQuestionsSkeleton />
              ) : noQuestions ? (
                <ReviewNoQuestions />
              ) : (
                <ReviewQuestions />
              )}
            </div>
          </div>

          <FooterFloatingActionButton
            label="Start Quiz"
            onClick={handleOpenAddNameDialog}
            buttonProps={{
              disabled:
                createQuizMutation.isPending ||
                noQuestions ||
                decryptQuestionsMutation.isPending,
            }}
          />

          <ReviewAddNameDialog
            open={isReviewAddNameDialogOpen}
            setOpen={setIsReviewAddNameDialogOpen}
            onStartQuiz={onStartQuiz}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

export default ReviewPage
