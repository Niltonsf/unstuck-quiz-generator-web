import { Option } from './option'

export type Question = {
  question: string
  options: Option[]
  correctAnswer: string
}
