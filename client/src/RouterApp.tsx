import { Route, BrowserRouter as Router, Routes } from 'react-router'
import LayoutPublic from './layouts/LayoutPublic'
import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutClient from './layouts/LayoutClient'

//PUBLIC
import PageHome from './pagepublic/PageHome'
import ProtectedRoutes from './pageauth/ProtectedRoutes'

//AUTH
import Login from './pageauth/Login'
import Register from './pageauth/Register'
import PanelAdmin from './pageadmin/PanelAdmin'
import PanelClient from './pageclient/PanelClient'

import UserAll from './pageadmin/UserAll'
import UserUpdate from './pageadmin/UserUpdate'
import CategoryAll from './pageadmin/CategoryAll'
import CategoryStore from './pageadmin/CategoryStore'
import CategoryUpdate from './pageadmin/CategoryUpdate'
import CompanyAll from './pageadmin/CompanyAll'
import About from './pagepublic/About'
import Contact from './pagepublic/Contact'

export default function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<PageHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index path="home" element={<PanelAdmin />} />
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
      </Routes>
    </Router>
  )
}
