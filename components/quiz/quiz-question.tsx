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
  const { currentIndex, handleSelectAnswer } = useQuizStore()

  const isMultipleChoice = currentQuestion?.answers?.length > 1
  const questionNumber = currentIndex + 1
  const isAnswered = 'isCorrect' in currentQuestion || isWaiting

  return (
    <>
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
          onSelect={(value) => handleSelectAnswer(currentQuestion.id, value)}
          disabled={isAnswered}
        />
      </Question>

      {(isWaiting || !!currentQuestion?.myAnswers?.length) &&
        currentQuestion?.isCorrect && <QuizCorrectAnswer />}
    </>
  )
}

export default QuizQuestion
