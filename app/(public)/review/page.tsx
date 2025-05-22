'use client'

import React, { useEffect, useState } from 'react'
import LogoTitle from '@/components/ui/logo-title'
import { useRouter } from 'next/navigation'
import LoadingOverlay from '@/components/layout/loading-overlay'
import { ReviewHeader } from '@/components/review/review-header'
import { useQuizStore } from '@/store/use-quiz-store'
import { handleError } from '@/lib/error-handler'
import { QuestionService } from '@/services/question-service'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { FooterFloatingActionButton } from '@/components/ui/footer-floating-action-button'
import ReviewAddNameDialog from '@/components/review/review-add-name-dialog'
import { delay } from '@/lib/time'
import { isProbablyEncrypted } from '@/lib/string'
import { AnimatePresence } from 'framer-motion'
import { ReviewQuestionsSkeleton } from '@/components/review/review-questions-skeleton'
import ReviewQuestions from '@/components/review/review-questions'
import ReviewNoQuestions from '@/components/review/review-no-questions'

const ReviewPage = () => {
  const router = useRouter()
  const { questions, setQuestions } = useQuizStore()

  const [isReviewAddNameDialogOpen, setIsReviewAddNameDialogOpen] =
    useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const decryptMutation = useMutation({
    mutationFn: () => QuestionService.decryptQuiz(questions),
    onSuccess: async (data) => {
      await delay(1000)

      setQuestions(data)
    },
    onError: handleError,
  })

  const createQuizMutation = useMutation({
    mutationFn: () => QuestionService.createQuiz(questions),
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
    const hasEncryptedAnswer = questions.some((q) =>
      q.answer.some((a) => isProbablyEncrypted(a)),
    )

    if (
      hasEncryptedAnswer &&
      !decryptMutation.isPending &&
      !decryptMutation.isSuccess
    ) {
      decryptMutation.mutate(undefined)
    }
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
                  Double-click an option to select it as correct. Double-click
                  it again to unselect.
                  <br />
                  <strong>
                    Note: Each question must have at least one correct answer.
                  </strong>
                </AlertDescription>
              </Alert>

              {decryptMutation.isPending ? (
                <ReviewQuestionsSkeleton />
              ) : !questions ? (
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
                !questions ||
                decryptMutation.isPending,
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
