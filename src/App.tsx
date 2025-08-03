import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './components/About/AboutSection'
import Main from './components/Home/Main'
import ContactPage from './components/Contact/ContactPage'
import RegisterPage from './components/Register/RegistrerPage'
import LoginPage from './components/Login/LoginPage'
import BookPage from './components/Users/Books/BookPage'
import Footer from './components/Footer'
import DefaultLayout from './components/DefaultLayout'

function App() {
 
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<Main/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<ContactPage/>}/>
            <Route path="users">
              <Route path="register" element={<RegisterPage/>}/>
            </Route>
            <Route path="auth">
              <Route path="login" element={<LoginPage/>}/>
            </Route>  
          </Route>
    
          <Route path="books" element={<BookPage/>}/>
        </Routes>  

      
      </BrowserRouter>

      <Footer/>
    </>
  )
}

export default App
