import { Link } from "react-router-dom"
import LoginImage from "./LoginImage"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="md:mt-0 mt-10 w-80 max-w-4xl md:w-full bg-white shadow-lg rounded-2xl overflow-hidden 
        flex flex-col md:flex-row mb-16 md:mb-0 py-5">

        <LoginImage/>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome back</h2>

            <LoginForm/>
          
            
            <p className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/users/register" className="text-dark-blue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage