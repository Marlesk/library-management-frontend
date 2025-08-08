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
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 ${colorClass}`}>{icon}</div>
      <span className="text-sm text-gray-700">
      <span className={`font-medium ${colorClass}`}>{label}:</span>{' '}
        {formatDate(date)}
      </span>
    </div>
  )
}

export default HistoryDates