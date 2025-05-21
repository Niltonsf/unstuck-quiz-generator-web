import { Answers } from '@/models/answer'
import { Question } from '@/models/question'
import { ValidateAnswerResponse } from '@/services/question-service'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuizState = {
  currentIndex: number
  title: string
  setTitle: (title: string) => void
  answerQuestion: (
    questionId: string,
    answer: string,
    validatedAnswerResponse?: ValidateAnswerResponse,
  ) => void
  selectedOptions: Record<string, string>
  updateQuestion: (
    questionId: string,
    updatedQuestion: Partial<Question>,
  ) => void
  answers: Answers
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  next: () => void
  previous: () => void
  resetQuiz: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      title: '',
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
      answerQuestion: (questionId, answer, validatedAnswerResponse) => {
        const { selectedOptions, answers } = get()

        const updatedSelectedOptions = {
          ...selectedOptions,
          [questionId]: answer,
        }

        const updatedAnswers = validatedAnswerResponse
          ? {
              ...answers,
              [questionId]: {
                answer,
                isCorrect: validatedAnswerResponse.isCorrect,
                correctAnswers: validatedAnswerResponse.correctAnswers,
              },
            }
          : answers

        set({
          selectedOptions: updatedSelectedOptions,
          answers: updatedAnswers,
        })
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
          title: '',
          currentIndex: 0,
          questions: [],
          answers: {},
          selectedOptions: {},
        })
      },
    }),
    {
      name: '@unstuckquiz:quiz',
      partialize: (state) => ({
        title: state.title,
        currentIndex: state.currentIndex,
        answers: state.answers,
        selectedOptions: state.selectedOptions,
        questions: state.questions,
      }),
    },
  ),
)
