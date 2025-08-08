type ReadOnlyDataProps = {
  label: string
  value: string
}

const ReadOnlyData = ({ label, value }: ReadOnlyDataProps) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 ml-1">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
  )
}

export default ReadOnlyData