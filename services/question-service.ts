import http from '@/lib/axios'
import { Question } from '@/models/question'

export interface GenerateQuestionsResponse {
  title: string
  questions: Question[]
}

export interface ValidateAnswerResponse {
  isCorrect: boolean
  correctAnswers: string[]
}

export class QuestionService {
  static async generateQuestions(
    pdf: File,
  ): Promise<GenerateQuestionsResponse> {
    const formData = new FormData()

    formData.append('file', pdf)

    const response = await http.post('/generate-questions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  static async createQuiz(questions: Question[]): Promise<Question[]> {
    const response = await http.post('/create-quiz', {
      data: questions,
    })

    return response.data
  }

  static async decryptQuiz(questions: Question[]): Promise<Question[]> {
    const response = await http.post('/decrypt-quiz', {
      data: questions,
    })

    return response.data
  }

  static async validateAnswer(
    question: Question,
    userAnswer: string,
  ): Promise<ValidateAnswerResponse> {
    const response = await http.post('/validate-answer', {
      question,
      userAnswer,
    })

    return response.data
  }
}
