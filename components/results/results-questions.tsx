import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useQuizStore } from '@/store/use-quiz-store'
import Question from '../ui/question/question'
import QuestionAnsweredOptions from '../ui/question/question-answered-options'
import QuestionHeader from '../ui/question/question-header'
import { QuestionHeaderQuestion } from '../ui/question/question-header-question'
import { Collapsible, CollapsibleContent } from '../ui/collapsible'
import { Separator } from '../ui/separator'

const ResultsQuestions = () => {
  const { answers, questions } = useQuizStore()

  const [openStates, setOpenStates] = useState(Array(10).fill(false))

  const groupedQuestions = questions.map((question) => ({
    question: question.question,
    options: question.options,
    isCorrect: answers[question.id].isCorrect,
    correctAnswers: answers[question.id].correctAnswers,
    selectedAnswer: answers[question.id].answer,
  }))

  const toggleOpenQuestion = (index: number) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    )
  }

  return (
    <>
      {groupedQuestions.map((question, index) => {
        const questionNumber = index + 1

        return (
          <Collapsible
            key={index}
            open={openStates[index]}
            onOpenChange={() => toggleOpenQuestion(index)}
          >
            <Question
              className="cursor-pointer"
              onClick={() => toggleOpenQuestion(index)}
            >
              <QuestionHeader
                questionNumber={questionNumber}
                isCorrect={question.isCorrect}
              >
                <QuestionHeaderQuestion question={question.question} />
              </QuestionHeader>

              <CollapsibleContent
                className={cn(
                  'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                )}
              >
                <Separator className="mb-5" />

                <QuestionAnsweredOptions question={question} />
              </CollapsibleContent>
            </Question>
          </Collapsible>
        )
      })}
    </>
  )
}

export default ResultsQuestions
