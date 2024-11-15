import { createBrowserRouter } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'
import authRoutes from './authRoutes'
import RootLayout from '../layouts/RootLayout'

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
]) 