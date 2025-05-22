export const getQuestionStatus = (
  userAnswers: string[] = [],
  correctAnswers: string[] = [],
) => {
  const hasIncorrectSelections = userAnswers.some(
    (ans) => !correctAnswers.includes(ans),
  )

  const correctSelections = userAnswers.filter((ans) =>
    correctAnswers.includes(ans),
  )

  if (hasIncorrectSelections || correctSelections.length === 0) {
    return 'INCORRECT'
  }

  if (correctSelections.length === correctAnswers.length) {
    return 'CORRECT'
  }

  return 'PARTIAL'
}
