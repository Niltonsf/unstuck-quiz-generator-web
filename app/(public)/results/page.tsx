'use client'

import React from 'react'
import { ResultsHeader } from '@/components/results/results-header'
import { ResultsCongratulationCard } from '@/components/results/results-congratulation-card'
import { useQuizStore } from '@/store/use-quiz-store'
import { FooterFloatingActionButton } from '@/components/ui/footer-floating-action-button'
import { useRouter } from 'next/navigation'
import ResultsQuestions from '@/components/results/results-questions'

const ResultsPage = () => {
  const route = useRouter()

  const { title, answers } = useQuizStore()

  const totalCorrectAnswers = Object.values(answers).filter(
    (answer) => answer.isCorrect,
  ).length

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
