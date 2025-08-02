import type { RefObject } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type TextInputProps = {
  id: string
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  type?: string
  placeholder?: string
  inputRef?: RefObject<HTMLInputElement | null> 
}

const TextInput = ({ id, label, register, error, type = "text", placeholder, inputRef } : TextInputProps) => {
  return (
    <div className="mb-4 space-y-1">
      <label htmlFor={id} className="block font-medium text-gray-700 ml-1">
        {label}
      </label>
      
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        ref={(e) => {
          register.ref(e)
          if (inputRef && e) inputRef.current = e
        }}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
      />
      {error && <p className="text-red-800 text-sm ml-2">{error.message}</p>}
    </div>
  )
} 

export default TextInput
