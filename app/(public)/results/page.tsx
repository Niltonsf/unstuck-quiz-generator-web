'use client'

import React, { useState } from 'react'
import { ResultsHeader } from '@/components/results/results-header'
import { ResultsCongratulationCard } from '@/components/results/results-congratulation-card'
import Question from '@/components/ui/question/question'
import QuestionHeader from '@/components/ui/question/question-header'
import { Separator } from '@/components/ui/separator'
import { QuestionHeaderQuestion } from '@/components/ui/question/question-header-question'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import QuestionAnswered from '@/components/ui/question/question-answered'
import { cn } from '@/lib/utils'

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
    selectedAnswer: 'option-one',
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
    selectedAnswer: 'venus',
  },
]

const ResultsPage = () => {
  const [openStates, setOpenStates] = useState(mockQuestions.map(() => false))

  const toggleOpen = (index: number) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    )
  }

  return (
    <div className="min-h-screen flex justify-center pt-11">
      <div className="max-w-7xl w-full flex items-start flex-col pb-10 mx-5">
        <ResultsHeader title={'Mathematics Quiz'} />

        <div className="max-w-4xl w-full self-center mt-16">
          <ResultsCongratulationCard />

          <p className="font-medium text-xl mt-9 mb-6">Result Summary</p>

          <div className="flex flex-col gap-6">
            {mockQuestions.map((question, index) => {
              const questionNumber = index + 1

              return (
                <Collapsible
                  key={index}
                  open={openStates[index]}
                  onOpenChange={() => toggleOpen(index)}
                >
                  <Question
                    className="cursor-pointer"
                    onClick={() => toggleOpen(index)}
                  >
                    <QuestionHeader
                      questionNumber={questionNumber}
                      isCorrect={
                        question.correctAnswer === question.selectedAnswer
                      }
                    >
                      <QuestionHeaderQuestion question="What innovative tool did Jake Harper develop to assist students with admissions into competitive academic majors at the University of Washington?" />
                    </QuestionHeader>

                    <CollapsibleContent
                      className={cn(
                        'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                      )}
                    >
                      <Separator className="mb-5" />

                      <QuestionAnswered question={question} />
                    </CollapsibleContent>
                  </Question>
                </Collapsible>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
