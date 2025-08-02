import type { RefObject } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type ContactFieldProps = {
  icon?: React.ReactNode
  type?: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
  inputRef?: RefObject<HTMLInputElement | null> 
  isTextArea?: boolean
}

const ContactField = ({ icon, type, placeholder, register, error, inputRef, isTextArea}: ContactFieldProps) => {
  return (
    <>
      {!isTextArea ? 
        <div className="space-y-1">
          <div className="flex items-center bg-light-blue rounded-lg px-4 py-3 w-full mt-1 border-2 border-gray-300 focus-within:border-dark-blue">
            <div className="text-gray-500 mr-3">{icon}</div>
            <input
              type={type}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none placeholder:text-gray-500"
              {...register}
              ref={(e) => {
                register.ref(e)
                if (inputRef && e) inputRef.current = e
              }}
            /> 
          </div>
          {error && <p className="text-red-800 text-sm ml-2">{error.message}</p>}
        </div> 

        :

        <div className="space-y-1">
          <div className="w-full bg-light-blue rounded-3xl px-4 py-3 border-2 border-gray-300 rounded-lg focus-within:border-dark-blue">
            <textarea
              placeholder={placeholder}
              className="w-full h-40 resize-none bg-transparent outline-none placeholder:text-gray-500"
              {...register}
            ></textarea>
          </div>
          {error && <p className="text-red-800 text-sm ml-2">{error.message}</p>}
        </div>
      }
    </>
   
  )
}


export default ContactField