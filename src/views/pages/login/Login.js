import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import domainName from 'src/domainName'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()

  const handleClickLogin = async () => {
    try {
      await axios
        .post(`${domainName}/api/v1/user/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const data = res.data.data
          setMessage(res.data.message)
          sessionStorage.setItem('userId', data.id)
          sessionStorage.setItem('permission', data.permission)
        })
    } catch (error) {
      setMessage(error.response.data.message)
      return
    }
    window.location.href = '/'
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>WELCOME</h1>
                    <p className="text-medium-emphasis">Hãy đăng nhập để đi tới trang admin</p>
                    {message != null ? <p style={{ color: '#FF0000' }}>{message}</p> : <></>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="d-flex justify-content-center align-items-center" xs={12}>
                        <CButton
                          color=" btn-outline-primary btn-hover"
                          className="px-4"
                          onClick={handleClickLogin}
                        >
                          Đăng nhập
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
