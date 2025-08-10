const currentYear = new Date().getFullYear()

const AdminFooter = () => {
  return (
    <footer className="bg-cyan-700 text-gray-200 py-2 text-center text-sm">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center md:mb-2">
        <span>&copy; {currentYear} Library App. All rights reserved.</span>
        <span>Version 1.0.0</span>
        <div className="gap-2">
          <a href="/help-center" className="underline hover:text-admin mx-2">Help Center</a> | 
          <a href="/privacy-policy" className="underline hover:text-admin mx-2">Privacy Policy</a> | 
          <a href="mailto:support@libraryapp.com" className="underline hover:text-admin mx-2">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export default AdminFooter
