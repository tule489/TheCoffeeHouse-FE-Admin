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
import { cilLockLocked, cilArrowLeft } from '@coreui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import domainName from 'src/environment/domainName'
import header from 'src/environment/header'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [message, setMessage] = useState()

  const handleClickChangePassword = async () => {
    if (password === repeatPassword) {
      try {
        await axios
          .post(
            `${domainName}/api/v1/auth/changePassword`,
            {
              newPassword: password,
              oldPassword: oldPassword,
            },
            header,
          )
          .then((res) => {
            setMessage(res.data.message)
            setOldPassword('')
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
                  <h1>Đổi mật khẩu</h1>
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
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mật khẩu cũ"
                      autoComplete="old-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mật khẩu mới"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleClickChangePassword}>
                      Xác nhận
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

export default ChangePassword
