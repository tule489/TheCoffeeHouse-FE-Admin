import React from 'react'

const Stats = React.lazy(() => import('./views/stats/Stats'))
const Product = React.lazy(() => import('./views/product/Product'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/products', name: 'Quản lý sản phẩm', element: Product },
  { path: '/stats', name: 'Thống kê doanh thu', element: Stats },
]

export default routes
