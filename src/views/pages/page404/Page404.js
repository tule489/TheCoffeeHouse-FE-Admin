import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404 Not Found</h1>
              <h1 className="float-start display-3 me-4" style={{ color: '#FF0000' }}>
                Sorry, the page you are looking for does not exist
              </h1>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
