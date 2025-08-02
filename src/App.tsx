import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './components/About/AboutSection'
import Footer from './components/Footer'
import Header from './components/Ηοme/Header'
import Main from './components/Ηοme/Main'
import ContactPage from './components/Contact/ContactPage'
import RegisterPage from './components/Register/RegistrerPage'
import LoginPage from './components/Login/LoginPage'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="users">
            <Route path="register" element={<RegisterPage/>}/>
          </Route>
          <Route path="auth">
            <Route path="login" element={<LoginPage/>}/>
          </Route>
        </Routes>
        
          
        
      </BrowserRouter>
      <Footer/> 
    </>
  )
}

export default App
