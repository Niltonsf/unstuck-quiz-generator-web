'use client'

import React, { useMemo } from 'react'
import { ResultsHeader } from '@/components/results/results-header'
import { ResultsCongratulationCard } from '@/components/results/results-congratulation-card'
import { useQuizStore } from '@/store/use-quiz-store'
import { FooterFloatingActionButton } from '@/components/ui/footer-floating-action-button'
import { useRouter } from 'next/navigation'
import ResultsQuestions from '@/components/results/results-questions'

const ResultsPage = () => {
  const route = useRouter()

  const { title, questions } = useQuizStore()

  const totalCorrectAnswers = useMemo(() => {
    let total = 0

    for (const question of questions) {
      if (question.isCorrect) {
        total++
        continue
      }

      const myAnswers = question.myAnswers || []
      const correctAnswers = question?.answers || []

      const hasIncorrectSelections = myAnswers?.some(
        (ans) => !question.answers?.includes(ans),
      )

      if (hasIncorrectSelections) {
        continue
      }

      const correctSelections = myAnswers.filter((ans) =>
        correctAnswers?.includes(ans),
      )

      if (correctSelections.length > 0 && !hasIncorrectSelections) {
        const partialScore = correctSelections.length / correctAnswers?.length

        total += partialScore
      }
    }

    return total || 0
  }, [questions])

  const handleGenerateNewQuiz = () => {
    route.push('/')
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col mx-5 pb-32">
        <ResultsHeader title={title} />

        <div className="max-w-4xl w-full self-center mt-16">
          <ResultsCongratulationCard
            totalCorrectAnswers={totalCorrectAnswers}
          />

          <p className="font-medium text-xl mt-9 mb-6">Result Summary</p>

          <div className="flex flex-col gap-6">
            <ResultsQuestions />
          </div>
        </div>
      </div>

      <FooterFloatingActionButton
        label="Generate new quiz"
        onClick={handleGenerateNewQuiz}
      />
    </div>
  )
}

export default ResultsPage
