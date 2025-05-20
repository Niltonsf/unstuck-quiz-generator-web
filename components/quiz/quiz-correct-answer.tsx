import Image from 'next/image'
import React from 'react'
// eslint-disable-next-line import/no-named-default
import { default as CorrectAnswerSVG } from '@/assets/svg/correct-answer.svg'

const QuizCorrectAnswer = () => {
  return (
    <div
      className={`flex items-center h-16 rounded-md border px-6 w-full gap-4 bg-green-100 border-green-300 text-green-600`}
    >
      <Image
        priority
        src={CorrectAnswerSVG}
        alt={'correct-answer'}
        className="w-8"
      />

      <span className="text-2xl font-medium">Correct!</span>
    </div>
  )
}

export { QuizCorrectAnswer }
