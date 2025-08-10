import { Outlet } from "react-router-dom"
import MainHeader from "./MainHeader"
import Footer from "@/components/footer/Footer"

const DefaultLayout= () => {
  return (
    <>
      <MainHeader/>
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default DefaultLayout