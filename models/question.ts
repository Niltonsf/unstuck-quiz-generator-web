import { Option } from './option'

export type Question = {
  id: string
  question: string
  options: Option[]
  questionNumber: number
  answers: string[]
  isCorrect?: boolean
  myAnswers?: string[]
}

export type QuestionStatus = 'CORRECT' | 'INCORRECT' | 'PARTIAL'
