import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartLine, cilClipboard, cilFastfood, cilList, cilUser } from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

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
    component: CNavGroup,
    name: 'Quản lý danh mục',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    to: '/category',
    badge: {
      color: 'info',
    },
    items: [
      {
        component: CNavItem,
        name: 'Danh mục',
        to: '/category/category',
      },
      {
        component: CNavItem,
        name: 'Danh mục chi tiết',
        to: '/category/detailedCategory',
      },
    ],
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
  localStorage.getItem('role') === 'ADMIN'
    ? {
        component: CNavTitle,
        name: 'Quản lý tài khoản',
      }
    : {
        component: CNavTitle,
        name: '',
      },
  localStorage.getItem('role') === 'ADMIN'
    ? {
        component: CNavItem,
        name: 'Quản lý tài khoản',
        to: '/accounts',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      }
    : {
        component: CNavTitle,
        name: '',
      },
]

export default _nav
