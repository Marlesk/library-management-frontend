import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type loginPasswordProps = {
  id: string
  label: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
}

const LoginPassword = ({id, label, placeholder, register, error}: loginPasswordProps) => {

  const [show, setShow] = useState(false)

  return (
    <div className="mt-4">
      <label htmlFor={id} className="block font-medium text-gray-700 ml-1">{label}</label>
      <div className='relative'>
        <input className="flex items-center w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
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
      {error && <p className="text-red-800 text-sm ml-2 mt-1">{error.message}</p>}
    </div>
  )
}

export default LoginPassword