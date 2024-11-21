import { lazy } from 'react'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'
import AdminRoute from '../middleware/AdminRoute'
import Transactions from '../pages/user/Transactions'

const Wishlist = lazy(() => import('../pages/user/Wishlist'))
const Cart = lazy(() => import('../pages/user/Cart'))
const Profile = lazy(() => import('../pages/user/Profile'))
const Checkout = lazy(() => import('../pages/user/Checkout'))
const Payment = lazy(() => import('../pages/user/Payment'))

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'))
const AdminUsers = lazy(() => import('../pages/admin/Users'))
const AdminActivities = lazy(() => import('../pages/admin/Activities'))
const AdminCategories = lazy(() => import('../pages/admin/Categories'))
const AdminBanners = lazy(() => import('../pages/admin/Banners'))
const AdminPromos = lazy(() => import('../pages/admin/Promos'))
const Media = lazy(() => import('../pages/admin/Media'))
const AdminTransactions = lazy(() => import('../pages/admin/Transactions'))
const TransactionDetail = lazy(() => import('../pages/admin/Transactions/TransactionDetail'))

const privateRoutes = [
  {
    element: <UserLayout />,
    children: [
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'payment/:id',
        element: <Payment />,
      },
    ],
  },
  {
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: 'admin/users',
        element: <AdminUsers />,
      },
      {
        path: 'admin/activities',
        element: <AdminActivities />,
      },
      {
        path: 'admin/categories',
        element: <AdminCategories />,
      },
      {
        path: 'admin/banners',
        element: <AdminBanners />,
      },
      {
        path: 'admin/promos',
        element: <AdminPromos />,
      },
      {
        path: 'admin/media',
        element: <Media />,
      },
      {
        path: 'admin/transactions',
        element: <AdminTransactions />,
      },
      {
        path: 'admin/transactions/:id',
        element: <TransactionDetail />,
      },
    ],
  },
]

export default privateRoutes 