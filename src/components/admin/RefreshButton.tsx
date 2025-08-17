import { RefreshCcw } from "lucide-react"

export type RefreshButtonProps = {
  label: string
  onClick: () => void
}

const RefreshButton = ({ label, onClick }: RefreshButtonProps) => {
  return (
    <button onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition cursor-pointer">
        <RefreshCcw size={18} />
        {label}
    </button>
  )
}

export default RefreshButton