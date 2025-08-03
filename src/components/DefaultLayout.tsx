import { Outlet } from "react-router-dom"
import MainHeader from "./Ηοme/MainHeader"

const DefaultLayout= () => {
  return (
    <>
      <MainHeader/>
      <Outlet/>
    </>
  )
}

export default DefaultLayout