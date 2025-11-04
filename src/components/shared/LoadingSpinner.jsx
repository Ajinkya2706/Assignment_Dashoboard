export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}


