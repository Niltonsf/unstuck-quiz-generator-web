import http from '@/lib/axios'
import { Question } from '@/models/question'

export interface ValidateAnswerResponse {
  isCorrect: boolean
  correctAnswers: string[]
}

type CreateQuizResponse = Question[]

export class QuizService {
  static async createQuiz(questions: Question[]): Promise<CreateQuizResponse> {
    const response = await http.post('/quiz/create', {
      data: questions,
    })

    return response.data
  }

  static async validateAnswer(
    question: Question,
    userAnswer: string,
  ): Promise<ValidateAnswerResponse> {
    const response = await http.post('/quiz/validate-answer', {
      question,
      userAnswer,
    })

    return response.data
  }
}
