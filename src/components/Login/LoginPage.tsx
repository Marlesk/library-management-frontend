import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="md:mt-12 mt-10 w-80 max-w-4xl md:w-full bg-white shadow-lg rounded-2xl overflow-hidden 
    flex flex-col md:flex-row mb-16 md:mb-0 py-5">

      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8">
        <img
          src="/login-page.jpg"
          alt="Girl reads a book with her cat"
          className="w-80 h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome back</h2>
        <form className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 ml-1">Username</label>
            <input
              type="text"
              placeholder="username"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-button-blue text-white px-6 py-2 rounded-full hover:bg-dark-blue transition cursor-pointer active:bg-dark-blue"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/users/register" className="text-dark-blue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
)

}

export default LoginPage