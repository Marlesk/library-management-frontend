import { AlertCircle, RefreshCcw } from "lucide-react"

type ErrorsProps = {
  error: string
}

const ErrorMessage = ({ error } : ErrorsProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50 text-red-700">
      <div className="flex items-center space-x-3 bg-red-100 border border-red-400 rounded-lg px-4 py-3 shadow-md max-w-md">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
      <button
        className="mt-6 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer" onClick={() => window.location.reload() }
      >
        <RefreshCcw className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  )
}

export default ErrorMessage