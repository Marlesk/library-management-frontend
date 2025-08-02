import ContactForm from "./ContactForm"
import ContactImage from "./ContactImage"

const ContactPage = () => {
  return (
     <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 px-4 md:pr-8">
          <div className="px-6 md:pt-16 pb-16 max-w-2xl mx-auto">
            <ContactForm/>
          </div>
        </div>
        
        <ContactImage/>
      </div>
  )
}

export default ContactPage