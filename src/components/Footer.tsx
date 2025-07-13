import { Mail, MapPin, Phone } from 'lucide-react'
const currentYear: number = new Date().getFullYear()

const Footer = () => {
  return(
    <footer className="bg-[#447795] text-white">
      <div className="flex justify-center items-center pt-4 text-md">
          <Mail color="white" size={20} />
          <a href="mailto:info@libraryapp.com" className="hover:underline ml-3 mr-8">info@libraryapp.com</a>
          <Phone color="white" size={20} />
          <a href="tel:+44234567890" className="hover:underline ml-3 mr-8">+44 234 567 890</a>
          <MapPin color="white" size={20} />
          <a href="https://www.google.com/maps?q=123+Library+St,+Knowledge+City" target="_blank" 
              rel="noopener noreferrer" className="hover:underline ml-3 mr-8">
                123 Library St, Knowledge City
          </a>
        </div>
        <div className="pb-4 pt-2 text-center text-sm">
          &copy; {currentYear} Library App. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer


