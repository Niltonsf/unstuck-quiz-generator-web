import React from 'react'
import Question from '../ui/question/question'
import QuestionHeader from '../ui/question/question-header'
import { QuestionHeaderQuestion } from '../ui/question/question-header-question'
import QuestionOptions from '../ui/question/question-options'
import { QuizCorrectAnswer } from './quiz-correct-answer'
import { useQuizStore } from '@/store/use-quiz-store'
import { Question as QuestionType } from '@/models/question'
import { Separator } from '../ui/separator'

interface QuizQuestionProps {
  currentQuestion: QuestionType
  isWaiting: boolean
}

const QuizQuestion = ({ currentQuestion, isWaiting }: QuizQuestionProps) => {
  const { currentIndex, selectedAnswers, handleSelectAnswer } = useQuizStore()

  const isMultipleChoice = currentQuestion?.answers?.length > 1
  const questionNumber = currentIndex + 1

  return (
    <div className="flex flex-1 w-full items-center justify-center my-3 flex-col gap-6">
      <Question>
        <QuestionHeader
          questionNumber={questionNumber}
          isMultipleChoice={isMultipleChoice}
        >
          <QuestionHeaderQuestion question={currentQuestion?.question} />
        </QuestionHeader>

        <Separator />

        <QuestionOptions
          currentQuestion={currentQuestion}
          selected={selectedAnswers[currentQuestion?.id] || []}
          onSelect={(value) => handleSelectAnswer(currentQuestion.id, value)}
          disabled={!!currentQuestion.userAnswers || isWaiting}
        />
      </Question>

      {(isWaiting || !!currentQuestion.userAnswers) &&
        currentQuestion.isCorrect && <QuizCorrectAnswer />}
    </div>
  )
}

export default QuizQuestion
