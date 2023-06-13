import React from 'react'

const Stats = React.lazy(() => import('./views/stats/Stats'))
const Product = React.lazy(() => import('./views/product/Product'))
const Category = React.lazy(() => import('./views/category/category'))
const DetailedCategory = React.lazy(() => import('./views/detailedCategory/detailCategory'))
const Order = React.lazy(() => import('./views/order/order'))
const Accounts = React.lazy(() => import('./views/accounts/accounts'))

const routes = [
  { path: '/products', name: 'Quản lý sản phẩm', element: Product },
  { path: '/category/category', name: 'Danh mục', element: Category },
  {
    path: '/category/detailedCategory',

    name: 'Danh mục chi tiết',
    element: DetailedCategory,
  },
  { path: '/order', name: 'Quản lý đơn hàng', element: Order },
  { path: '/stats', name: 'Thống kê doanh thu', element: Stats },
  { path: '/accounts', name: 'Quản lý tài khoản', element: Accounts },
]

export default routes
