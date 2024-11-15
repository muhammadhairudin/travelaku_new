import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function AuthLayout() {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
} 