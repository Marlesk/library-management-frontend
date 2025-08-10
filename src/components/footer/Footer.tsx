import { Mail, MapPin, Phone } from 'lucide-react'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
   <footer className="bg-[#447795] text-white text-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <a href="mailto:info@libraryapp.com" className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
            <Mail size={16} /> info@libraryapp.com
          </a>
          <a href="tel:+44234567890" className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
            <Phone size={16} /> +44 234 567 890
          </a>
          <a
            href="https://www.google.com/maps?q=123+Library+St,+Knowledge+City"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-300 cursor-pointer"
            title="123 Library St, Knowledge City"
          >
            <MapPin size={16} /> 123 Library St, Knowledge City
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/help-center" className="hover:text-blue-300 cursor-pointer">Help Center</a>
          <a href="/privacy-policy" className="hover:text-blue-300 cursor-pointer">Privacy Policy</a>
        </div>
      </div>

      <div className="bg-[#366178] py-2 text-center text-xs opacity-80">
        &copy; {currentYear} Library App. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
