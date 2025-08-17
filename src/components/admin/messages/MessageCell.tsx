import { useState } from "react"

type Props = {
  message: string
}

const MessageCell = ({ message }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 100;

  if (message.length <= limit) {
    return <td className="text-gray-700 whitespace-pre-wrap">{message}</td>;
  }
    
  return (
      <p className="text-gray-700 whitespace-pre-wrap">
        {expanded ? message : message.slice(0, limit) + "..."}
        <button
          className="text-cyan-600 ml-2 underline cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "less" : "more"}
        </button>
      </p>
  )
}

export default MessageCell