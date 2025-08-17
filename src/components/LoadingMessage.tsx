import { Loader2 } from "lucide-react";

type LoadingProps = {
  message: string
}

const LoadingMessage = ({ message } :LoadingProps) =>{
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  )
}

export default LoadingMessage
