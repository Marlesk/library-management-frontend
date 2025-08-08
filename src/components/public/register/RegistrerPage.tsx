
import ImageRegister from "./ImageResister"

import RegistrationForm from "./RegistrationForm"

const RegistrerPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mt-28 w-full max-w-6xl md:flex mb-10">

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl text-center font-semibold text-gray-800 mb-2">Create an account</h2>
            <p className="text-gray-800 leading-relaxed max-w-prose mx-auto text-center mb-5">
                Fill in your details or sign in with Google.
            </p>
            
            <RegistrationForm/>
        
          </div>

          <ImageRegister/>
      </div>
    </div>
  )
}

export default RegistrerPage