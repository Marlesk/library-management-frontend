import { LibraryBig, ClipboardCheck, History, UserCog } from 'lucide-react'
import React from 'react'

type AboutFeature = {
  Icon: React.ElementType
  title: String
  description: String
}

const AboutFeature: AboutFeature[] =[
  {
    Icon: LibraryBig,
    title: "Browse the Collection",
    description: "Explore hundreds of books across different genres and authors."
  },
  {
    Icon: ClipboardCheck,
    title: "Request Loans",
    description: "Easily request to borrow books with just a few clicks."
  },
  {
    Icon: History,
    title: "Track Your History",
    description: "Keep track of all the books you’ve borrowed and returned."
  },
  {
    Icon: UserCog,
    title: "Manage Your Profile",
    description: "Update your personal details and view your activity anytime."
  }
]

export default AboutFeature
