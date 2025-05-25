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
    answers: string[],
    validatedAnswerResponse?: ValidateAnswerResponse,
  ) => void
  handleSelectAnswer: (questionId: string, answer: string) => void
  updateQuestion: (
    questionId: string,
    updatedQuestion: Partial<Question>,
  ) => void
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  next: () => void
  previous: () => void
  resetQuiz: () => void
  clear: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      title: '',
      currentIndex: 0,
      questions: [],
      answers: {},
      setTitle: (title) => {
        set({ title })
      },
      setQuestions: (questions) => {
        set({ questions })
      },
      handleSelectAnswer: (questionId: string, answer: string) => {
        const { questions } = get()

        const question = questions.find((q) => q.id === questionId)

        const questionAnswerLength = question?.answers?.length || 0
        const isMultipleChoice = questionAnswerLength > 1

        let updatedAnswersArray: string[]

        if (isMultipleChoice) {
          const alreadySelected = question?.myAnswers?.includes(answer)
          const myAnswers = question?.myAnswers || []

          if (alreadySelected) {
            const removedAlreadySelectedAnswer =
              myAnswers?.filter((a) => a !== answer) || []

            updatedAnswersArray = removedAlreadySelectedAnswer
          } else {
            updatedAnswersArray = [...myAnswers, answer]
          }
        } else {
          updatedAnswersArray = [answer]
        }

        const updatedQuestions = questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              myAnswers: updatedAnswersArray,
            }
          }

          return question
        })
        set({
          questions: updatedQuestions,
        })
      },
      answerQuestion: (
        questionId: string,
        currentQuestionAnswers: string[],
        validatedAnswerResponse?: ValidateAnswerResponse,
      ) => {
        const { questions } = get()

        const updatedQuestions = questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              isCorrect: validatedAnswerResponse?.isCorrect,
              myAnswers: currentQuestionAnswers,
              answers: validatedAnswerResponse?.decryptedAnswers || [],
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
        })
      },
      clear: () => {
        set({
          title: '',
          currentIndex: 0,
          questions: [],
        })
      },
    }),
    {
      name: '@unstuckquiz:quiz',
      partialize: (state) => ({
        title: state.title,
        currentIndex: state.currentIndex,
        questions: state.questions,
      }),
    },
  ),
)
