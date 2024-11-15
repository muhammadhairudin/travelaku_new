import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function UserLayout() {
  const { token, user, isLoading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
} 