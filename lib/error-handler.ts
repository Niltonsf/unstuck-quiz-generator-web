import axios from 'axios'
import { toast } from 'sonner'

export function handleError(
  error: unknown,
  fallbackMessage = 'Something went wrong, please try again',
) {
  if (axios.isAxiosError(error)) {
    console.log('error-handler:aq ', error)
    const detail = (error.response?.data as { detail?: string })?.detail

    if (detail) {
      toast.error(detail)
    } else {
      toast.error(fallbackMessage)
    }
  } else {
    toast.error(fallbackMessage)
  }
}
