import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router'
import LayoutPublic from './pages/layouts/LayoutPublic'
import LayoutAdmin from './pages/layouts/LayoutAdmin'
import LayoutClient from './pages/layouts/LayoutClient'

//PUBLIC
import PageHome from './pages/publicPage/PageHome'
import ProtectedRoutes from './pages/authPage/ProtectedRoutes'

//AUTH
import Login from './pages/authPage/Login'
import Register from './pages/authPage/Register'
import PanelAdmin from './pages/adminPage/PanelAdmin'
import PanelClient from './pages/clientPage/PanelClient'

import UserAll from './pages/adminPage/UserAll'
import UserUpdate from './pages/adminPage/UserUpdate'
import CategoryAll from './pages/adminPage/CategoryAll'
import CategoryStore from './pages/adminPage/CategoryStore'
import CategoryUpdate from './pages/adminPage/CategoryUpdate'
import CompanyAll from './pages/adminPage/CompanyAll'
import About from './pages/publicPage/About'
import Contact from './pages/publicPage/Contact'
import Header from './components/Header'
import Footer from './components/Footer'

export default function RouterApp() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<PageHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<PanelAdmin />} />
            <Route path="user" element={<UserAll />} />
            <Route path="user/edit/:id" element={<UserUpdate />} />
            <Route path="category" element={<CategoryAll />} />
            <Route path="category/create" element={<CategoryStore />} />
            <Route path="category/edit/:id" element={<CategoryUpdate />} />
            <Route path="company" element={<CompanyAll />} />
          </Route>
          <Route path="/client" element={<LayoutClient />}>
            <Route index element={<PanelClient />} />
            <Route path="homme" element={<PageHome />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  )
}
