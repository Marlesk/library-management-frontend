import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'
import TextInput from "./TextInput"
import { registerSchema, type registerValues } from './registerSchema'
import PasswordInput from "./PasswordInput"
import RegisterButton from "./RegisterButton"
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


const API_URL: string = import.meta.env.VITE_API_URL

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
}

const RegistrationForm = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  

  const { 
    register,
    handleSubmit, 
    formState: {errors}, 
    setError,
    reset 
  } = useForm<registerValues>({ 
    resolver: zodResolver(registerSchema), 
    defaultValues: initialValues,  
    mode: "onChange"
  })

  const onSubmit = async (data: registerValues) => {  
    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await res.json()

      if (!res.ok) {
        const msg = result.message || ""

        if (msg.toLowerCase().includes("email")) {
          setError("email", { type: "manual", message: msg })
        } else if (msg.toLowerCase().includes("username")) {
          setError("username", { type: "manual", message: msg })
        } else {
          toast.error(result.message || "Registration failed")
        }
      } else {
        toast.success('Account created successfully')
        reset()
      }
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextInput
          id="firstname"
          label="First Name"
          placeholder="First Name"
          register={register('firstname')}
          error={errors.firstname}
          inputRef={inputRef}
        />

        <TextInput
            id="lastname"
            label="Last Name"
            placeholder="Last Name"
            register={register('lastname')}
            error={errors.lastname}
          />

          <TextInput
            id="email"
            label="Email"
            placeholder="Email"
            register={register('email')}
            error={errors.email}
            type="email"
          />

          <TextInput
            id="username"
            label="Username"
            placeholder="Username"
            register={register('username')}
            error={errors.username}
          />

          <PasswordInput
            label="Password"
            id="password"
            register={register('password')}
            error={errors.password}
          />

        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <RegisterButton
          text="Register"
        />

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-dark-blue hover:underline">
            Login
          </Link>
        </p>
      </form>
      
      <Toaster duration={3000} expand={true} richColors/>
    </>
  )
}

export default RegistrationForm
