import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import Question from '../ui/question/question'
import QuestionHeader from '../ui/question/question-header'
import { QuestionHeaderQuestion } from '../ui/question/question-header-question'
import QuestionOptions from '../ui/question/question-options'
import { QuizCorrectAnswer } from './quiz-correct-answer'
import { useQuizStore } from '@/store/use-quiz-store'
import { Question as QuestionType } from '@/models/question'
import { Answer } from '@/models/answer'

interface QuizQuestionProps {
  currentQuestion: QuestionType
  isWaiting: boolean
  answer: Answer
}

const QuizQuestion = ({
  currentQuestion,
  isWaiting,
  answer,
}: QuizQuestionProps) => {
  const { currentIndex, selectedOptions, answerQuestion } = useQuizStore()

  return (
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
          disabled={!!answer || isWaiting}
          answer={answer}
        />
      </Question>

      {(isWaiting || !!answer) && answer.isCorrect && <QuizCorrectAnswer />}
    </div>
  )
}

export default QuizQuestion
