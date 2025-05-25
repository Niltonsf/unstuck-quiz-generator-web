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
    answers: string[],
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
      title: '',
      currentIndex: 0,
      questions: [],
      answers: {},
      selectedAnswers: {},
      setTitle: (title) => {
        set({ title })
      },
      setQuestions: (questions) => {
        set({ questions })
      },
      handleSelectAnswer: (questionId: string, answer: string) => {
        const { selectedAnswers, questions } = get()

        const currentSelected = selectedAnswers[questionId] || []
        const question = questions.find((q) => q.id === questionId)
        const questionAnswerLength = question?.answer?.length || 0
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
          // answers: updatedAnswers,
        })
      },
      answerQuestion: (
        questionId: string,
        selectedAnswers: string[],
        validatedAnswerResponse?: ValidateAnswerResponse,
      ) => {
        const { answers } = get()

        const updatedAnswers = validatedAnswerResponse
          ? {
              ...answers,
              [questionId]: {
                answer: selectedAnswers,
                isCorrect: validatedAnswerResponse.isCorrect,
                correctAnswers: validatedAnswerResponse.correctAnswers,
              },
            }
          : answers

        set({
          selectedAnswers: {
            ...get().selectedAnswers,
            [questionId]: selectedAnswers,
          },
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
          selectedAnswers: {},
        })
      },
      reset: () => {
        set({
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
        title: state.title,
        currentIndex: state.currentIndex,
        answers: state.answers,
        selectedAnswers: state.selectedAnswers,
        questions: state.questions,
      }),
    },
  ),
)
