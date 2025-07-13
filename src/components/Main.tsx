const Main = () => {
  return (
    <div className="flex h-screen px-8">
      <div className="w-1/2 flex flex-col justify-center space-y-6 pr-8">
        <h1 className="text-5xl font-bold text-dark-blue">
          Discover, Borrow, Read
        </h1>
        <p className="text-lg text-gray-800">
          Your new digital library – Sign up and start your journey into knowledge.
        </p>
        <div className="flex space-x-4">
          <button className="bg-button-blue text-white px-6 py-2 rounded-lg hover:bg-dark-blue transition cursor-pointer">
            Sign Up
          </button>
          <button className="border border-button-blue text-dark-blue px-6 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            Log In
          </button>
        </div>
      </div>

      {/* Δεξιά πλευρά: Background image */}
      <div className="w-1/2 bg-[url('/bg-1.jpg')] bg-right bg-no-repeat bg-contain"></div>
    </div>
  )
}

export default Main

