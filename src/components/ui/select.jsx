import * as React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-black ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = "Select"

export { Select }


