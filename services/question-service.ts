import http from '@/lib/axios'
import { Question } from '@/models/question'

export interface GenerateQuestionsResponse {
  id: string
  title: string
  questions: Question[]
}

export interface ValidateAnswerResponse {
  isCorrect: boolean
  correctAnswersDescrypted: string[]
  userAnswers: string[]
}

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

  static async answer(
    quizId: string,
    questionId: string,
    question: Question,
    userAnswer: string[],
  ): Promise<ValidateAnswerResponse> {
    const response = await http.post('/questions/answer', {
      id: quizId,
      questionId,
      question,
      userAnswer,
    })

    return response.data
  }
}
