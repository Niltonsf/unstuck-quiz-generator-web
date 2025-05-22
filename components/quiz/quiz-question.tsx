import React from 'react'
import Question from '../ui/question/question'
import QuestionHeader from '../ui/question/question-header'
import { QuestionHeaderQuestion } from '../ui/question/question-header-question'
import QuestionOptions from '../ui/question/question-options'
import { QuizCorrectAnswer } from './quiz-correct-answer'
import { useQuizStore } from '@/store/use-quiz-store'
import { Question as QuestionType } from '@/models/question'
import { Answer } from '@/models/answer'
import { Separator } from '../ui/separator'

interface QuizQuestionProps {
  currentQuestion: QuestionType
  isWaiting: boolean
  answered: Answer
}

const QuizQuestion = ({
  currentQuestion,
  isWaiting,
  answered,
}: QuizQuestionProps) => {
  const { currentIndex, selectedAnswers, handleSelectAnswer } = useQuizStore()

  return (
    <div className="flex flex-1 w-full items-center justify-center my-3 flex-col gap-6">
      <Question>
        <QuestionHeader questionNumber={currentIndex + 1}>
          {currentQuestion?.answer?.length > 1 && (
            <div className="text-sm text-blue-600 font-medium">
              This is a multiple choice question. Select all that apply.
            </div>
          )}

          <QuestionHeaderQuestion question={currentQuestion?.question} />
        </QuestionHeader>

        <Separator />

        <QuestionOptions
          currentQuestion={currentQuestion}
          selected={selectedAnswers[currentQuestion?.id] || []}
          onSelect={(value) => handleSelectAnswer(currentQuestion.id, value)}
          disabled={!!answered || isWaiting}
          answered={answered}
        />
      </Question>

      {(isWaiting || !!answered) && answered.isCorrect && <QuizCorrectAnswer />}
    </div>
  )
}

export default QuizQuestion
