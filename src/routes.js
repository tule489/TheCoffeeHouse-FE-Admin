import React from 'react'

const Stats = React.lazy(() => import('./views/stats/Stats'))
const Product = React.lazy(() => import('./views/product/Product'))
const Category = React.lazy(() => import('./views/category/category'))
const DetailedCategory = React.lazy(() => import('./views/detailedCategory/detailCategory'))

const routes = [
  { path: '/products', exact: true, name: 'Quản lý sản phẩm', element: Product },
  { path: '/category/category', exact: true, name: 'Danh mục', element: Category },
  {
    path: '/category/detailedCategory',
    exact: true,
    name: 'Danh mục chi tiết',
    element: DetailedCategory,
  },
  { path: '/stats', exact: true, name: 'Thống kê doanh thu', element: Stats },
]

export default routes
