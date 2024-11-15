import { lazy } from 'react'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'
import AdminRoute from '../middleware/AdminRoute'

const Wishlist = lazy(() => import('../pages/user/Wishlist'))
const Cart = lazy(() => import('../pages/user/Cart'))
const Profile = lazy(() => import('../pages/user/Profile'))
const Transactions = lazy(() => import('../pages/user/Transactions'))
const Payment = lazy(() => import('../pages/user/Payment'))
const Checkout = lazy(() => import('../pages/user/Checkout'))

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'))
const AdminUsers = lazy(() => import('../pages/admin/Users'))
const AdminActivities = lazy(() => import('../pages/admin/Activities'))
const AdminCategories = lazy(() => import('../pages/admin/Categories'))
const AdminBanners = lazy(() => import('../pages/admin/Banners'))
const AdminPromos = lazy(() => import('../pages/admin/Promos'))
const Media = lazy(() => import('../pages/admin/Media'))

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
    ],
  },
]

export default privateRoutes 