import { Outlet } from "react-router-dom"
import MainHeader from "./Home/MainHeader"

const DefaultLayout= () => {
  return (
    <>
      <MainHeader/>
      <Outlet/>
    </>
  )
}

export default DefaultLayout