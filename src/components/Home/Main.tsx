import { Link } from "react-router-dom"

const Main = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-auto md:h-screen px-6 md:px-8 py-12 md:py-0">
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 md:pr-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-blue">
          Discover, Borrow, Read
        </h1>
        <p className="text-base md:text-lg text-gray-800">
          Your new digital library – Sign up and start your journey into knowledge.
        </p>
        <div className="flex justify-center space-x-4 ">
          <Link to="/users/register" className="bg-button-blue text-white px-6 py-2 rounded-lg hover:bg-dark-blue transition cursor-pointer active:bg-dark-blue">
            Sign Up
          </Link>
          
          <Link to="/auth/login" className="border border-button-blue text-dark-blue px-6 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer active:bg-blue-50 ">
            Log In
          </Link>
         
        </div>
      </div>

      <div className="w-full mt-12 md:mt-0 md:w-1/2 h-64 md:h-auto bg-[url('/bg-1.jpg')] bg-center md:bg-right bg-no-repeat bg-contain">
      </div>
    </div>
  )
}

export default Main 

