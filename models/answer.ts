export interface Answer {
  answer: string
  isCorrect: boolean
  correctAnswers: string[]
}

export type Answers = Record<string, Answer>
