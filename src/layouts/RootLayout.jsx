import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function RootLayout() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  )
} 