import { Mail, User } from'lucide-react'
import { useRef, useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import ContactField from "./ContactField"
import { contactSchema, type contactValues } from "./contactSchema"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SendButton from './SendButton'

const API_URL: string = import.meta.env.VITE_API_URL

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  message: ''
}

const ContactForm = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { 
    register,
    handleSubmit, 
    formState: {errors}, 
    reset 
  } = useForm<contactValues>({ 
    resolver: zodResolver(contactSchema), 
    defaultValues: initialValues,
    mode: "onChange"
  })

  const onSubmit = async (data: contactValues) => {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!res.ok) {
        toast.error('Failed to send message')
      } 
      
      await res.json()
      toast.success('Message sent successfully')
      reset()
      inputRef.current?.focus()
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="text-3xl text-center font-semibold mb-2 mt-10 text-dark-blue">Contact us</h2>
        <p className="text-gray-800 text-center text-lg leading-relaxed max-w-prose mx-auto">
          Have a question or comment? Get in touch with us
        </p>

        <ContactField
          icon={<User size={20} />}
          type="text"
          placeholder="First Name"
          error={errors.firstname}
          register={register('firstname')}
          inputRef={inputRef}
          isTextArea={false}
        />

        <ContactField
          icon={<User size={20} />}
          type="text"
          placeholder="Last Name"
          error={errors.lastname}
          register={register('lastname')}
          isTextArea={false}
        />

        <ContactField
          icon={<Mail size={20} />}
          type="email"
          placeholder="Email"
          error={errors.email}
          register={register('email')}
          isTextArea={false}
        />

        <ContactField
          placeholder="Message"
          error={errors.message}
          register={register('message')}
          isTextArea={true}
        />
      

       <SendButton/> 

      </form>

      <Toaster duration={3000} expand={true} richColors/>
    </>
  )
}

export default ContactForm