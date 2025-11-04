import * as React from "react"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export const ToastContext = React.createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([])

  const showToast = (message, type = "default") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
      <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    return { showToast: () => {} }
  }
  return context
}

const Toast = ({ message, type, onClose }) => {
  const icons = {
    default: <Info className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
  }

  const styles = {
    default: "bg-white border-2 border-gray-300 text-black shadow-lg",
    success: "bg-green-50 border-2 border-green-300 text-green-800 shadow-lg",
    error: "bg-red-50 border-2 border-red-300 text-red-800 shadow-lg",
  }

  return (
    <div className={cn("flex items-center gap-3 rounded-lg border p-4 shadow-lg min-w-[300px]", styles[type])}>
      {icons[type]}
      <p className="flex-1 text-sm">{message}</p>
      <button onClick={onClose} className="text-gray-600 hover:text-black">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}


