'use client'

import React, { useEffect, useState } from 'react'
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
import { QuizIncorrectAnswer } from '@/components/quiz/quiz-incorrect-answer'
import { QuizHeader } from '@/components/quiz/quiz-header'
import { QuestionHeaderQuestion } from '@/components/ui/question/question-header-question'

const mockQuestions = [
  {
    question:
      'What innovative tool did Jake Harper develop to assist students with admissions into competitive academic majors at the University of Washington?',
    options: [
      { value: 'option-one', label: 'Option One' },
      { value: 'option-two', label: 'Option Two' },
      { value: 'option-three', label: 'Option Three' },
      { value: 'option-four', label: 'Option Four' },
    ],
    correctAnswer: 'option-three',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: [
      { value: 'mars', label: 'Mars' },
      { value: 'venus', label: 'Venus' },
      { value: 'jupiter', label: 'Jupiter' },
      { value: 'saturn', label: 'Saturn' },
    ],
    correctAnswer: 'venus',
  },
]

const QuizPage = () => {
  const router = useRouter()
  const {
    questions,
    currentIndex,
    setQuestions,
    next,
    answers,
    selectedAnswers,
    selectAnswer,
    previous,
  } = useQuizStore()

  const [cooldown, setCooldown] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = selectedAnswers[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const isAnswerAlreadyAnswered = !!answers[currentIndex]

  const handleNext = () => {
    if (cooldown) {
      return
    }

    if (!selectedAnswer) {
      toast('Please select an answer before continuing.')
      return
    }

    if (isAnswerAlreadyAnswered) {
      next()

      if (isLastQuestion) {
        router.push('/results')
      }
      return
    }

    answers[currentIndex] = selectedAnswer

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
  }

  console.log('page: ', isLastQuestion)

  useEffect(() => {
    setQuestions(mockQuestions)
  }, [setQuestions])

  if (!currentQuestion) {
    return <></>
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-10 mx-5">
        <QuizHeader title={'Mathematics Quiz'} />

        <div className="max-w-3xl w-full flex flex-1 flex-col self-center">
          <div className="flex flex-1 w-full items-center justify-center my-3 flex-col gap-6">
            <Question>
              <QuestionHeader questionNumber={currentIndex + 1}>
                <QuestionHeaderQuestion question={currentQuestion.question} />
              </QuestionHeader>

              <Separator />

              <QuestionOptions
                questions={currentQuestion.options}
                onSelect={(value) => selectAnswer(currentIndex, value)}
                selected={selectedAnswers[currentIndex]}
                disabled={isAnswerAlreadyAnswered || showFeedback}
              />
            </Question>

            {(showFeedback || isAnswerAlreadyAnswered) &&
              (selectedAnswer === currentQuestion.correctAnswer ? (
                <QuizCorrectAnswer />
              ) : (
                <QuizIncorrectAnswer
                  correctAnswer={
                    currentQuestion.options.find(
                      (opt) => opt.value === currentQuestion.correctAnswer,
                    )?.label || 'Unknown'
                  }
                />
              ))}
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
