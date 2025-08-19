type EditInputFieldProps = {
  value?: string | number
  isTextArea: boolean
  id: string
  label: string
  name: string
  onChange: (name: string, value: string) => void
}

const EditInputField = ({ value, isTextArea, id, label, name, onChange }: EditInputFieldProps) => {

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value)
  }
  return (
    <>
      {!isTextArea ? 
        <div className="mb-4 space-y-1">
          <label htmlFor={id} className="block font-medium text-gray-600 ml-1">
            {label}
          </label>
          <input
            id={id}
            type="text"
            name="title"
            value={value}
            className="w-full mt-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600"
            onChange={handleChange}
          />
        </div>
      : 
        <div className="mb-4 space-y-1">
          <label htmlFor={id} className="block font-medium text-gray-600 ml-1">
            {label}
          </label>
          <textarea 
            id={id}
            value={value}
            name={name}
            className="w-full h-56 resize-none mt-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600"  
            onChange={handleChange}
          />
        </div>
      }
    </>
  )
}

export default EditInputField