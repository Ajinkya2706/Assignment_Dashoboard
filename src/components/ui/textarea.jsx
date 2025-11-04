import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-black ring-offset-2 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }


