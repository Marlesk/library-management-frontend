import { Send } from "lucide-react"

const SendButton = () => {
  return ( 
    <button 
      className="flex items-center justify-center bg-button-blue text-white rounded-full hover:bg-dark-blue transition cursor-pointer active:bg-dark-blue w-full px-6 py-2">
      Send Message
      <Send size={20} className="text-white ml-2" />
    </button>
  )
}

export default SendButton