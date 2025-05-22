import axios from 'axios'
import { toast } from 'sonner'

export function handleError(
  error: unknown,
  fallbackMessage = 'Something went wrong, please try again later',
) {
  if (axios.isAxiosError(error)) {
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
