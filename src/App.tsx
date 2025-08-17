import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import About from './components/public/about/AboutSection'
import Main from './components/public/home/Main'
import ContactPage from './components/public/contact/ContactPage'
import RegisterPage from './components/public/register/RegistrerPage'
import LoginPage from './components/public/login/LoginPage'
import BooksPage from './components/user/books/BooksPage'
import DefaultLayout from './components/public/menu/DefaultLayout'
import UserLayout from './components/user/menu/UserLayout'
import BookDetailsPage from './components/user/books/BookDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './components/user/profile/ProfilePage'
import BookHistoryPage from './components/user/history/BookHistoryPage'
import AdminUsersPage from './components/admin/users/AdminUsersPage'
import AdminLayout from './components/admin/AdminLayout'
import HelpCenterPage from './components/HelpCenterPage'
import PrivacyPolicyPage from './components/PrivacyPolicePage'
import AdminProfilePage from './components/admin/profile/AdminProfilePage'
import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import InboxMessagesPage from './components/admin/messages/InboxMessagesPage'
import BorrowsPage from './components/admin/borrows/BorrowsPage'
import AdminBooksPage from './components/admin/books/AdminBooksPage'
import ViewBookPage from './components/admin/books/view/ViewBookPage'
import AddBookPage from './components/admin/books/add/AddBookPage'



function ToastListener() {
  const location = useLocation();

  useEffect(() => {
    const msg = sessionStorage.getItem("toastMessage");
    if (msg) {
      toast.error(msg);
      sessionStorage.removeItem("toastMessage");
    }
  }, [location])

  return null
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster duration={3000} expand={true} richColors/> 
        <ToastListener />
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
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Route>

          <Route element={<UserLayout/>}>
            <Route path="books" element={
              <ProtectedRoute>
                <BooksPage/>
              </ProtectedRoute>
            }/>
              
            <Route path="books/isbn/:isbn" element={
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
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            
          </Route>
          
          <Route element={<AdminLayout/>}>
           <Route path="admin/books" element={
                <ProtectedRoute adminOnly>
                  <AdminBooksPage />
                </ProtectedRoute>
            }/>

            <Route path="admin/books/isbn/:isbn" element={
                <ProtectedRoute adminOnly>
                  <ViewBookPage/>
                </ProtectedRoute>
            }/>

            <Route path="admin/books/add" element={
              <ProtectedRoute adminOnly>
                <AddBookPage />
              </ProtectedRoute>
            }/>

            <Route path="admin/users" element={
                <ProtectedRoute adminOnly>
                  <AdminUsersPage />
                </ProtectedRoute>
            }/>
            <Route path="admin/borrows" element={
               <ProtectedRoute adminOnly>
                <BorrowsPage/>
               </ProtectedRoute>
            }/>

            <Route path="admin/messages" element={
              <ProtectedRoute adminOnly>
              <InboxMessagesPage/>
              </ProtectedRoute>
            }/>
            
            <Route path="admin/profile" element={
               <ProtectedRoute adminOnly>
                <AdminProfilePage/>
               </ProtectedRoute>
            }/>
          
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Route>

        </Routes>  

       
      
      </BrowserRouter>

     
    </>
  )
}

export default App
