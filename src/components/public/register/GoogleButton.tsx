type GoogleButtonProps = {
  text: string
}

const GoogleButton = ({text}: GoogleButtonProps) => {
  return (
    <>
      <div className="relative flex items-center justify-center mb-6 mt-6">
          <div className="h-px bg-gray-200 w-full" />
          <span className="absolute bg-white px-2 text-xs text-gray-500">OR</span>
      </div>
      <button 
        type="button"
        className="w-full h-12 text-center rounded-xl border px-4 py-2 font-medium hover:bg-gray-50 transition mb-6 flex items-center justify-center cursor-pointer text-sm">
        <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3">
          <path fill="#4285f4" d="M533.5 278.4c0-18.2-1.6-35.8-4.6-52.9H272.1v100.2h146.9c-6.3 33.9-25 62.6-53.4 81.9v67h86.3c50.6-46.6 79.6-115.2 79.6-196.2z" />
          <path fill="#34a853" d="M272.1 544.3c72.6 0 133.5-24 178-65.1l-86.3-67c-24 16.2-54.6 25.9-91.7 25.9-70.6 0-130.5-47.6-152-111.7H33v70.3c44.3 87.1 135.2 147.6 239.1 147.6z" />
          <path fill="#fbbc04" d="M120.1 324.4c-10.4-30.7-10.4-64 0-94.7V159.4H33c-38.1 74.5-38.1 163.4 0 237.9l87.1-70.3z" />
          <path fill="#ea4335" d="M272.1 107.7c39.4 0 75 13.6 103 40.4l77.3-77.3C400.4 24.3 340.5 0 272.1 0 168.1 0 77.2 60.5 33 147.6l87.1 70.3c21.4-64.1 81.3-111.7 152-111.7z" />
        </svg>
        {text}
      </button>
    </>
    
    

  )
}

export default GoogleButton