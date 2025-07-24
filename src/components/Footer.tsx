// import { Mail, MapPin, Phone } from 'lucide-react'
// const currentYear: number = new Date().getFullYear()

// const Footer = () => {
//   return(
//     <footer className="bg-[#447795] text-white">
//       <div className="flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-4 md:space-y-0 px-4 pt-4 items-center">
//         <div className="flex items-center gap-2">
//           <Mail size={20} />
//           <a href="mailto:info@libraryapp.com" className="hover:underline">info@libraryapp.com</a>
//         </div>
//         <div className="flex items-center gap-2">
//           <Phone size={20} />
//           <a href="tel:+44234567890" className="hover:underline">+44 234 567 890</a>
//         </div>
//         <div className="flex items-center gap-2">
//           <MapPin size={20} />
//           <a href="https://www.google.com/maps?q=123+Library+St,+Knowledge+City" target="_blank"
//                 rel="noopener noreferrer" className="hover:underline">
//             123 Library St, Knowledge City
//           </a>
//         </div>
//       </div> 
//         <div className="pb-4 pt-4 text-center text-sm">
//           &copy; {currentYear} Library App. All rights reserved.
//         </div>
//     </footer>
//   )
// }

// export default Footer


import { Mail, MapPin, Phone } from 'lucide-react'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="bg-[#447795] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-16 space-y-6 md:space-y-0 items-center text-md">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Mail size={20} />
            <a href="mailto:info@libraryapp.com" className="hover:underline">
              info@libraryapp.com
            </a>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Phone size={20} />
            <a href="tel:+44234567890" className="hover:underline">
              +44 234 567 890
            </a>
          </div>
          <div className="flex items-center gap-2 text-center">
            <MapPin size={20} />
            <a
              href="https://www.google.com/maps?q=123+Library+St,+Knowledge+City"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline max-w-xs truncate"
              title="123 Library St, Knowledge City"
            >
              123 Library St, Knowledge City
            </a>
          </div>
        </div>
        <div className="pt-6 text-center text-sm opacity-80 select-none">
          &copy; {currentYear} Library App. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
