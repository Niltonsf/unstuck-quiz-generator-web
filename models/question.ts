import { Option } from './option'

export type Question = {
  id: string
  question: string
  options: Option[]
  questionNumber: number
  answer: string[]
}
