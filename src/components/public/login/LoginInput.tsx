import type { RefObject } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type LoginFormProps = {
  id: string
  label: string
  type: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
  inputRef?: RefObject<HTMLInputElement | null>
}

const LoginInput = ({ id, label, type, placeholder, register, error, inputRef }: LoginFormProps) => {
  return (
      <div>
        <label htmlFor={id} className="block font-medium text-gray-700 ml-1">{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          ref={(el) => {
            register.ref(el)
            if (inputRef && el) inputRef.current=el
          }}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
        />
        {error && <p className="text-red-800 text-sm ml-2 mt-1">{error.message}</p>}
      </div>
  )
}

export default LoginInput