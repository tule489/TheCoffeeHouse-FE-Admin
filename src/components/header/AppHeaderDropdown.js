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
import avatar8 from './../../assets/avatar.jpg'
import userAvatar from './../../assets/user-avatar.jpg'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

const AppHeaderDropdown = () => {
  const handleClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')

    window.location.reload()
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {localStorage.getItem('role') === 'ADMIN' ? (
          <CAvatar src={avatar8} size="md" />
        ) : (
          <CAvatar src={userAvatar} size="md" />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Tài khoản</CDropdownHeader>
        <CDropdownItem href="#/changePassword">
          <VpnKeyOutlinedIcon className="me-2" sx={{ fontSize: 16 }} />
          Đổi mật khẩu
        </CDropdownItem>
        {localStorage.getItem('role') === 'ADMIN' ? (
          <CDropdownItem href="#/register">
            <CIcon icon={cilUserPlus} className="me-2" />
            Đăng ký
          </CDropdownItem>
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
