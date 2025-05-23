import { Option } from './option'

export type Question = {
  id: string
  question: string
  options: Option[]
  questionNumber: number
  answers: string[]
  userAnswers?: string[]
  isCorrect?: boolean
  correctAnswersDescrypted?: string[]
}

export type QuestionStatus = 'CORRECT' | 'INCORRECT' | 'PARTIAL'
