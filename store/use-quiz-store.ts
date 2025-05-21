import { Answers } from '@/models/answer'
import { Question } from '@/models/question'
import { ValidateAnswerResponse } from '@/services/question-service'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuizState = {
  isEncrypted: boolean
  title: string
  setTitle: (title: string) => void
  setIsEncrypted: (isEncrypted: boolean) => void
  currentIndex: number
  questions: Question[]
  answers: Answers
  selectAnswer: (questionId: string, answer: string) => void
  selectedOptions: Record<string, string>
  updateQuestion: (
    questionId: string,
    updatedQuestion: Partial<Question>,
  ) => void
  next: () => void
  previous: () => void
  setAnswer: (
    questionId: string,
    answer: string,
    validatedAnswerResponse: ValidateAnswerResponse,
  ) => void
  setQuestions: (questions: Question[]) => void
  resetQuiz: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      title: '',
      isEncrypted: false,
      currentIndex: 0,
      questions: [],
      answers: {},
      selectedOptions: {},
      setTitle: (title) => {
        set({ title })
      },
      setQuestions: (questions) => {
        set({ questions })
      },
      setIsEncrypted: (isEncrypted) => {
        set({ isEncrypted })
      },
      setAnswer: (questionId, answer, validatedAnswerResponse) => {
        const { answers } = get()

        const updatedAnswers = {
          ...answers,
          [questionId]: {
            answer,
            isCorrect: validatedAnswerResponse.isCorrect,
            correctAnswers: validatedAnswerResponse.correctAnswers,
          },
        }

        set(() => ({
          answers: updatedAnswers,
        }))
      },
      selectAnswer: (questionId, answer) => {
        const { selectedOptions } = get()

        const updatedAnswers = {
          ...selectedOptions,
          [questionId]: answer,
        }

        set(() => ({
          selectedOptions: updatedAnswers,
        }))
      },
      updateQuestion: (
        questionId: string,
        updatedQuestion: Partial<Question>,
      ) => {
        const { questions } = get()

        const updatedQuestions = questions.map((question) =>
          question.id === questionId
            ? { ...question, ...updatedQuestion }
            : question,
        )

        set(() => ({
          questions: updatedQuestions,
        }))
      },
      next: () => {
        const { currentIndex, questions } = get()

        set({
          currentIndex: Math.min(currentIndex + 1, questions.length - 1),
        })
      },
      previous: () => {
        set((state) => ({
          currentIndex: Math.max(state.currentIndex - 1, 0),
        }))
      },
      resetQuiz: () => {
        set({
          currentIndex: 0,
          answers: {},
          selectedOptions: {},
        })
      },
      reset: () => {
        set({
          currentIndex: 0,
          questions: [],
          answers: {},
          selectedOptions: {},
        })
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentIndex: state.currentIndex,
        answers: state.answers,
        selectedOptions: state.selectedOptions,
        questions: state.questions,
      }),
    },
  ),
)
