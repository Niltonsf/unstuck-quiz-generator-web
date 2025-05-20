import { Question } from '@/models/question'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuizState = {
  currentIndex: number
  questions: Question[]
  answers: Record<number, string>
  selectedAnswers: Record<number, string>
  selectAnswer: (index: number, answer: string) => void
  next: () => void
  previous: () => void
  setQuestions: (questions: Question[]) => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentIndex: 0,
      questions: [],
      answers: {},
      selectedAnswers: {},
      setQuestions: (questions) => {
        set({ questions })
      },
      selectAnswer: (index, answer) => {
        set((state) => ({
          selectedAnswers: { ...state.selectedAnswers, [index]: answer },
        }))
      },
      next: () => {
        const { currentIndex, selectedAnswers, answers, questions } = get()

        const newAnswer = selectedAnswers[currentIndex]

        const newAnswers = newAnswer !== undefined
          ? { ...answers, [currentIndex]: newAnswer }
          : answers

        set({
          answers: newAnswers,
          currentIndex: Math.min(currentIndex + 1, questions.length - 1),
        })
      },
      previous: () => {
        set((state) => ({
          currentIndex: Math.max(state.currentIndex - 1, 0),
        }))
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentIndex: state.currentIndex,
        answers: state.answers,
        selectedAnswers: state.selectedAnswers,
        questions: state.questions,
      }),
    }
  )
)
