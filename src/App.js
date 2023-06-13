import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import jwtDecode from 'jwt-decode'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/changePassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
var decode

const isTokenValid = () => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    decode = jwtDecode(accessToken)
    localStorage.setItem('username', decode.sub)
    return Date.now() / 1000 < decode.exp
  }
  return false
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="/login"
              name="Login Page"
              element={isTokenValid() === true ? <Navigate to="/" /> : <Login />}
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route
              exact
              path="/changePassword"
              name="Change password Page"
              element={<ChangePassword />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route
              path="*"
              name="Home"
              element={isTokenValid() === true ? <DefaultLayout /> : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
