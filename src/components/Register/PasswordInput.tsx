import { useState } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { Eye, EyeOff } from 'lucide-react'
import Info from "./Info"

type PasswordInputProps = {
  label?: string,
  id?: string,
  register: UseFormRegisterReturn
  error?: FieldError
}

const PasswordInput = ({label, id, register, error} : PasswordInputProps) => {
  
  const [show, setShow] = useState(false)

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <label className="block font-medium text-gray-700 ml-1" htmlFor={id}>
          {label}
        </label>
        <Info title="At least 8 characters: uppercase, lowercase, number & special character (!@#$)" />
      </div>

      <div className='relative space-y-1'>
        <input className="flex items-center w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
          id={id}
          type={show ? "text" : "password"}
          {...register}
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
        {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error && <p className="text-red-800 text-sm ml-2">{error.message}</p>}
    </div>
      
  )
}

export default PasswordInput