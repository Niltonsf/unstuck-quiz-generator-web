import http from '@/lib/axios'
import { Question } from '@/models/question'

type CreateQuizResponse = Question[]

type DecryptQuizResponse = Question[]

export class QuizService {
  static async create(
    quizId: string,
    questions: Question[],
  ): Promise<CreateQuizResponse> {
    const response = await http.post('/quiz/create', {
      quizId,
      data: questions,
    })

    return response.data
  }

  static async decryptQuiz(
    questions: Question[],
  ): Promise<DecryptQuizResponse> {
    const response = await http.post('/quiz/decrypt', {
      data: questions,
    })

    return response.data
  }
}
