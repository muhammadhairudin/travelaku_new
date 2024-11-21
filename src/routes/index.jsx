import { createBrowserRouter } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'
import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import RootLayout from '../layouts/RootLayout'
import AdminLayout from '../layouts/AdminLayout'
import ActivityDetail from '../pages/public/ActivityDetail/index'
import Payment from '../pages/user/Payment/index'
import PaymentSuccess from '../pages/user/PaymentSuccess'
import AdminRoute from '../middleware/AdminRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      ...authRoutes,
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: adminRoutes
  },
  {
    path: '/activities/:id',
    element: <ActivityDetail />
  },
  {
    path: '/payment/:id',
    element: <Payment />
  },
  {
    path: '/payment-success',
    element: <PaymentSuccess />
  },
]) 