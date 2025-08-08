import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'
import RegisterInput from "./RegisterInput"
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
         if (result.errors) {
          for (const key in result.errors) {
            setError(key as keyof registerValues, {
              type: "manual",
              message: result.errors[key],
            })
          }
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
        <RegisterInput
          id="firstname"
          label="First Name"
          placeholder="First Name"
          register={register('firstname')}
          error={errors.firstname}
          inputRef={inputRef}
        />

        <RegisterInput
            id="lastname"
            label="Last Name"
            placeholder="Last Name"
            register={register('lastname')}
            error={errors.lastname}
          />

          <RegisterInput
            id="email"
            label="Email"
            placeholder="Email"
            register={register('email')}
            error={errors.email}
            type="email"
          />

          <RegisterInput
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
