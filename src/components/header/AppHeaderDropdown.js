import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownHeader,
} from '@coreui/react'
import { cilAccountLogout, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const handleClickLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('permission')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        {localStorage.getItem('permission') === 'admin' ? (
          <Link to="/register">
            <CDropdownItem>
              <CIcon icon={cilUserPlus} className="me-2" />
              Đăng ký
            </CDropdownItem>
          </Link>
        ) : (
          <></>
        )}
        <CDropdownItem href="/" onClick={handleClickLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
