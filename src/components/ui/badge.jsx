import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "text-black border-2 border-black",
  }

  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
  )
}

export { Badge }