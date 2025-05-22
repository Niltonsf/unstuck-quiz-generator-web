import http from '@/lib/axios'
import { Question } from '@/models/question'

export interface GenerateQuestionsResponse {
  title: string
  questions: Question[]
}

type DecryptQuizResponse = Question[]

export class QuestionService {
  static async generateQuestions(
    pdf: File,
  ): Promise<GenerateQuestionsResponse> {
    const formData = new FormData()

    formData.append('file', pdf)

    const response = await http.post('/questions/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  static async decryptQuiz(
    questions: Question[],
  ): Promise<DecryptQuizResponse> {
    const response = await http.post('/questions/decrypt', {
      data: questions,
    })

    return response.data
  }
}
