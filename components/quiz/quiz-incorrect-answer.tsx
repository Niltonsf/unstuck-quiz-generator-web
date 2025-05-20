import React from 'react'

interface QuizIncorrectAnswerProps {
  correctAnswer: string
}

const QuizIncorrectAnswer = ({ correctAnswer }: QuizIncorrectAnswerProps) => {
  return (
    <div
      className={`flex items-center h-16 rounded-md border px-6 w-full gap-4 bg-red-100 border-red-300 text-red-600`}
    >
      <span className="text-2xl font-medium">
        Incorrect! The correct answer is: {correctAnswer}
      </span>
    </div>
  )
}

export { QuizIncorrectAnswer }
