import { Save, SquarePen, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { updateProfileSchema } from "./profileSchema";


type EditDataProps = {
  type: string,
  label: string,
  value: string,
  name: "email",
  onSave: (name: "email", value: string) => void 
}

const EditData = ({ type, label, value, name, onSave }: EditDataProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
       inputRef.current?.focus()
    }
  }, [isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value)
  }

  const handleSave = () => {
    if (name === "email") {
      const result = updateProfileSchema.safeParse({ email: tempValue });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }
    }
    setError(null)
    onSave(name, tempValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null);
    setTempValue(value)
  }

  return (
    <div>
      <label className="block font-medium text-gray-700 ml-1">{label}</label>
      <div className="relative flex items-center">
        {isEditing? (
            <>
              <input
                  ref={inputRef}
                  type={type}
                  value={tempValue}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
                  onChange={handleChange}
                />
                <button type="button" className="absolute right-10 mt-1 text-gray-600 hover:text-dark-blue cursor-pointer"
                  onClick={handleSave}>
                  <Save size={18}/>
                </button>
                <button type="button" className="absolute right-3 mt-1 text-gray-600 hover:text-dark-blue cursor-pointer"
                  onClick={handleCancel}>
                  <X size={18}/>
                </button>
            </>
          ) : 
          (
            <>
              <span className="mt-1 w-full border border-gray-300 rounded-lg p-2">{value}</span>
              <button type="button" className="absolute right-3 mt-1 text-gray-600 hover:text-dark-blue cursor-pointer"
              onClick={() => setIsEditing(true)}>
                <SquarePen size={18}/>
              </button>
            </>
          )
        }
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export default EditData