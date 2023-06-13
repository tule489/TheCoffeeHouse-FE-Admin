import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilArrowLeft } from '@coreui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import domainName from 'src/environment/domainName'

const Register = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [message, setMessage] = useState()

  const handleClickRegister = async () => {
    if (password === repeatPassword) {
      try {
        await axios
          .post(`${domainName}/api/v1/auth/register`, {
            username: username,
            password: password,
          })
          .then((res) => {
            setMessage(res.data.message)
            setUsername('')
            setPassword('')
            setRepeatPassword('')
          })
        return
      } catch (error) {
        setMessage(error.response.data.message)
        return
      }
    }
    setMessage('Repeat password is incorrect')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <CIcon icon={cilArrowLeft} className="me-2" style={{ fontSize: '4rem' }} />
                  <span className="text-medium-emphasis" style={{ fontSize: 20 }}>
                    Quay lại
                  </span>
                </Link>
                <br />
                <CForm>
                  <h1>Đăng ký</h1>
                  <br />
                  {message != null ? (
                    <p
                      style={{
                        color: `{message === 'Register successfully' ? '#33FF00' : '#FF0000'}`,
                      }}
                    >
                      {message}
                    </p>
                  ) : (
                    <></>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Tên đăng nhập"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="Mật khẩu đăng nhập"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="Nhập lại mật khẩu"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleClickRegister}>
                      Tạo tài khoản
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
