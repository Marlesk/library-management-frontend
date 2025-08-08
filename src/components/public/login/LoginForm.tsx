import { useForm } from "react-hook-form"
import LoginButton from "./LoginButton"
import LoginInput from "./LoginInput"
import { loginSchema, type loginValues } from "./loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Toaster } from "sonner"
import { useEffect, useRef } from "react"
import LoginPassword from "./LoginPassword"
import { useNavigate } from "react-router-dom"

const API_URL: string = import.meta.env.VITE_API_URL

const initialValues = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm<loginValues>({
    resolver:zodResolver(loginSchema),
    defaultValues: initialValues,
    mode: "onChange"
  })


  const onSubmit = async (data: loginValues) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.errors) {
          for (const key in result.errors) {
            setError(key as keyof loginValues, {
              type:"manual",
              message: result.errors[key]
            })
          }
        }
      } else if (result.status) {
        const token: string = result.data
        localStorage.setItem('accessToken', token)
        navigate('/books')
      } else {
        toast.error('Login failed')
      }
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          id="username"
          label="Username"
          type="text"
          placeholder="username"
          register={register("username")}
          error={errors.username}
          inputRef={inputRef}
        />
                
        <LoginPassword
          id="password"
          label="Password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password}
        />

        <LoginButton/>

      </form>

      <Toaster duration={3000} expand={true} richColors/>
    </>
  )

}


export default LoginForm