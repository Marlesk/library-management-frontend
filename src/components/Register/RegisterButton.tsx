type RegisterButtonProps = {
  text: string
}

const RegisterButton = ({text}: RegisterButtonProps) => {
  return (
   <button
    type="submit"
    className="w-full bg-button-blue text-white px-6 py-2 rounded-full hover:bg-dark-blue transition cursor-pointer active:bg-dark-blue mt-4">
    {text}
  </button>
  )
}

export default RegisterButton