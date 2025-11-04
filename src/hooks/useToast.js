import { useToast as useToastContext } from '../components/ui/toast'

export const useToast = () => {
  try {
    return useToastContext()
  } catch {
    return { showToast: () => {} }
  }
}


