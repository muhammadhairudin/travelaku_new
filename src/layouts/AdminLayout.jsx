import { Outlet, Navigate, useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '../store/slices/authSlice'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { 
  HomeIcon, 
  UsersIcon, 
  TicketIcon,
  TagIcon,
  PhotoIcon,
  CurrencyDollarIcon as PromoIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

const sidebarLinks = [
  { path: '/admin', icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard' },
  { path: '/admin/users', icon: <UsersIcon className="w-5 h-5" />, label: 'Users' },
  { path: '/admin/activities', icon: <TicketIcon className="w-5 h-5" />, label: 'Activities' },
  { path: '/admin/categories', icon: <TagIcon className="w-5 h-5" />, label: 'Categories' },
  { path: '/admin/banners', icon: <PhotoIcon className="w-5 h-5" />, label: 'Banners' },
  { path: '/admin/promos', icon: <PromoIcon className="w-5 h-5" />, label: 'Promos' },
  { path: '/admin/media', icon: <FolderIcon className="w-5 h-5" />, label: 'Media Library' },
]

export default function AdminLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user, isLoading } = useSelector((state) => state.auth)
  const location = useLocation()

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/')
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!token || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen">
      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar />
      </div>

      <div className="pt-16">
        <div className="flex">
          {/* Sidebar - Fixed position */}
          <div className="fixed left-0 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 flex flex-col">
            {/* Navigation Links */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {sidebarLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === link.path
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logo Section at Bottom with adjusted height and margin */}
            <div className="h-[200px] py-8 px-6 bg-gradient-to-br from-primary/5 to-primary/10 border-t border-gray-200">
              <div className="flex flex-col justify-center items-center h-full transition-all duration-300 transform hover:scale-105">
                <div className="p-4 bg-white rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
                  <img 
                    src="/Logo.svg" 
                    alt="TravelAku Logo" 
                    className="w-32 h-auto filter drop-shadow-md"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    TravelAku Admin
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Version 1.0.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Scrollable with margin for sidebar */}
          <div className="flex-1 ml-64">
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
              <Outlet />
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 