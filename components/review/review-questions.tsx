import React from 'react'
import Question from '../ui/question/question'
import QuestionHeader from '../ui/question/question-header'
import { QuestionHeaderQuestion } from '../ui/question/question-header-question'
import QuestionReviewOption from '../ui/question/question-review-option'
import { Question as QuestionType } from '@/models/question'
import { useQuizStore } from '@/store/use-quiz-store'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

const ReviewQuestions = () => {
  const { questions, updateQuestion } = useQuizStore()

  const handleToggleAnswerSelection = (
    question: QuestionType,
    selectedAnswer: string,
  ) => {
    const questionAnswers = question.answers ?? []

    const isAlreadyAnAnswer = questionAnswers.includes(selectedAnswer)

    if (isAlreadyAnAnswer) {
      if (questionAnswers.length === 1) {
        toast('You must select at least one correct answer')
        return
      }

      updateQuestion(question.id, {
        answers: questionAnswers.filter((answer) => answer !== selectedAnswer),
      })
    } else {
      if (questionAnswers.length >= 3) {
        toast('You can only select up to 3 correct answers')
        return
      }

      updateQuestion(question.id, {
        answers: [...questionAnswers, selectedAnswer],
      })
    }
  }

  const onOptionTextUpdate = (
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

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id}>
          <QuestionHeader questionNumber={question.questionNumber}>
            <QuestionHeaderQuestion question={question.question} />
          </QuestionHeader>

          <Separator />

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium mb-3">
              {question.answers.length > 1 ? 'Multichoice' : 'Singlechoise'}{' '}
              Answers
            </span>

            {question.options.map((option, optionIndex) => (
              <QuestionReviewOption
                key={`${question.id}-option-${optionIndex}`}
                optionNumber={optionIndex + 1}
                answer={option.label}
                isCorrectAnswer={question?.answers?.includes(option.value)}
                onDoubleClick={() =>
                  handleToggleAnswerSelection(question, option.value)
                }
                onTextChange={(e) =>
                  onOptionTextUpdate(e, question, optionIndex)
                }
              />
            ))}
          </div>
        </Question>
      ))}
    </>
  )
}

export default ReviewQuestions
