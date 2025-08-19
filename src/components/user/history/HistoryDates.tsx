type HistoryDatesProps = {
  icon: React.ReactNode
  date?: string
  colorClass: string
  label: string
}

const formatDate = (dateStr?: string) => {
  return dateStr ? new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;
}

const HistoryDates = ({ icon, colorClass, label, date}: HistoryDatesProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-x-2">
      <div className="flex items-center text-sm space-x-2">
        <div className={`w-4 h-4 ${colorClass}`}>{icon}</div>
        <span className={`font-medium ${colorClass}`}>{label}:</span>{' '}
      </div>
      <span className="text-sm text-gray-700">
        {formatDate(date)}
      </span>
    </div>
  )
}

export default HistoryDates