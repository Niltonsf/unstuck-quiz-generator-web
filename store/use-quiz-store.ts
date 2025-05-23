import { Answers } from '@/models/answer'
import { Question } from '@/models/question'
import { ValidateAnswerResponse } from '@/services/question-service'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuizState = {
  currentIndex: number
  id: string
  setId: (id: string) => void
  title: string
  setTitle: (title: string) => void
  answerQuestion: (
    questionId: string,
    validatedAnswerResponse?: ValidateAnswerResponse,
  ) => void
  handleSelectAnswer: (questionId: string, answer: string) => void
  selectedAnswers: Record<string, string[]>
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
      id: '',
      title: '',
      currentIndex: 0,
      questions: [],
      answers: {},
      selectedAnswers: {},
      setTitle: (title) => {
        set({ title })
      },
      setId: (id) => {
        set({ id })
      },
      setQuestions: (questions) => {
        set({ questions })
      },
      handleSelectAnswer: (questionId: string, answer: string) => {
        const { selectedAnswers, questions } = get()

        const currentSelected = selectedAnswers[questionId] || []
        const question = questions.find((q) => q.id === questionId)
        const questionAnswerLength = question?.answers?.length || 0
        const isMultipleChoice = questionAnswerLength > 1

        let updatedAnswersArray: string[]

        if (isMultipleChoice) {
          const alreadySelected = currentSelected.includes(answer)

          updatedAnswersArray = alreadySelected
            ? currentSelected?.filter((a) => a !== answer)
            : [...currentSelected, answer]
        } else {
          updatedAnswersArray = [answer]
        }

        const updatedSelectedOptions = {
          ...selectedAnswers,
          [questionId]: updatedAnswersArray,
        }

        set({
          selectedAnswers: updatedSelectedOptions,
        })
      },
      answerQuestion: (
        questionId: string,
        validatedAnswerResponse?: ValidateAnswerResponse,
      ) => {
        const { questions } = get()

        const updatedQuestions = questions.map((question) => {
          if (question.id === questionId && validatedAnswerResponse) {
            return {
              ...question,
              isCorrect: validatedAnswerResponse.isCorrect,
              userAnswers: validatedAnswerResponse.userAnswers,
              answers: validatedAnswerResponse.correctAnswersDescrypted,
            }
          }

          return question
        })

        set({
          questions: updatedQuestions,
        })
      },
      updateQuestion: (
        questionId: string,
        updatedQuestion: Partial<Question>,
      ) => {
        const { questions } = get()

        const updatedQuestions = questions.map((question) => {
          return question.id === questionId
            ? { ...question, ...updatedQuestion }
            : question
        })

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
          selectedAnswers: {},
        })
      },
      reset: () => {
        set({
          id: '',
          title: '',
          currentIndex: 0,
          questions: [],
          answers: {},
          selectedAnswers: {},
        })
      },
    }),
    {
      name: '@unstuckquiz:quiz',
      partialize: (state) => ({
        id: state.id,
        title: state.title,
        currentIndex: state.currentIndex,
        answers: state.answers,
        selectedAnswers: state.selectedAnswers,
        questions: state.questions,
      }),
    },
  ),
)
