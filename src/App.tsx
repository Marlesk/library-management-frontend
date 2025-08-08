import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './components/public/about/AboutSection'
import Main from './components/public/home/Main'
import ContactPage from './components/public/contact/ContactPage'
import RegisterPage from './components/public/register/RegistrerPage'
import LoginPage from './components/public/login/LoginPage'
import BooksPage from './components/user/books/BooksPage'
import Footer from './components/Footer'
import DefaultLayout from './components/public/DefaultLayout'
import UserLayout from './components/user/UserLayout'
import BookDetailsPage from './components/user/books/BookDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './components/user/profile/ProfilePage'
import BookHistoryPage from './components/user/history/BookHistoryPage'

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

          <Route element={<UserLayout/>}>
            <Route path="books" element={
              <ProtectedRoute>
                <BooksPage/>
              </ProtectedRoute>
            }/>
              
            <Route path="books/title/:title" element={
               <ProtectedRoute>
                <BookDetailsPage/>
               </ProtectedRoute>
            }/>

            <Route path="users/profile" element={
               <ProtectedRoute>
                <ProfilePage/>
               </ProtectedRoute>
            }/>

            <Route path="/borrows" element={
              <ProtectedRoute>
              <BookHistoryPage/>
              </ProtectedRoute>
            }/>
          </Route>
        </Routes>  

      
      </BrowserRouter>

      <Footer/>
    </>
  )
}

export default App
