import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartLine, cilClipboard, cilFastfood, cilList } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Quản lý website',
  },
  {
    component: CNavItem,
    name: 'Quản lý sản phẩm',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    to: '/products',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Quản lý danh mục',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    to: '/category',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Quản lý đơn hàng',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    to: '/order',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Báo cáo thống kê',
  },
  {
    component: CNavItem,
    name: 'Thống kê doanh thu',
    to: '/stats',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
