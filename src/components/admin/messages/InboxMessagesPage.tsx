import { useEffect, useState } from "react";
import { getInboxMessages, type InboxMessages } from "./message";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import PaginationTable from "../PaginationTable";
import MessageCell from "./MessageCell";
import RefreshButton from "../RefreshButton";
import { formatDateHours } from "../formatDate";

const MESSAGES_PER_PAGE = 10

const InboxMessagesPage = () => {
  const [messages, setMessages] = useState<InboxMessages[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchMessages = async() => {
    setLoading(true)
    try {
      const result = await getInboxMessages()
      setMessages(result)
    } catch {
      setError('Failed to fetch inbox messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
   fetchMessages()
  },[])

  if (loading) return <LoadingMessage message="Loading inbox messages..."/>
  if (error) return <ErrorMessage error={error}/>
  if (!messages) return null

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE)
  const indexOfLastItem = currentPage * MESSAGES_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - MESSAGES_PER_PAGE

  const paginatedMessages = messages.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen mb-10">
      <h1 className="text-3xl font-bold mb-6 text-admin text-center">Inbox Messages</h1>
      <div className="flex justify-end">
        <RefreshButton label="Refresh Messages" onClick={fetchMessages}/>
      </div>
     
   <div className="space-y-10 mt-6">
        {paginatedMessages.length > 0 ? (
          paginatedMessages.map((message, i) => (
            <div key={i}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:bg-blue-50 
              transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {message.firstname} {message.lastname}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDateHours(message.createdAt)}
                </span>
              </div>
              <a href={`mailto:${message.email}`} className="text-cyan-600 underline mb-3 inline-block">
                {message.email}
              </a>
              <MessageCell message={message.message} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6 text-lg">
            No messages found
          </p>
        )}
      </div>
      { totalPages > 1 && 
        <PaginationTable
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      }
    </div>
  )
}

export default InboxMessagesPage