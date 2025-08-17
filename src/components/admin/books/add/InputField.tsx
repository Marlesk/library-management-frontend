import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type InputFieldProps = {
  placeholder: string
  isTextArea: boolean
  register?: UseFormRegisterReturn
  error?: FieldError 
}

const InputField = ({ placeholder, isTextArea, register, error }: InputFieldProps) => {
  return (
    <>
      {!isTextArea ? 
        <div>
          <input 
            type="text"
            placeholder={placeholder}
            className="w-full mt-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
            {...register}
          />
          {error && <p className="text-red-800 text-sm ml-2 mt-1"> {error?.message} </p>}
        </div>
      : 
        <div>
          <textarea 
            placeholder={placeholder}
            className="w-full h-56 resize-none mt-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue" 
            {...register}      
          />
          {error && <p className="text-red-800 text-sm ml-2 mt-2"> {error?.message}</p>}
        </div>
      }
    </>
  )
}

export default InputField