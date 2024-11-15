import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '../../store/slices/authSlice'
import {
  HomeIcon,
  UsersIcon,
  TicketIcon,
  TagIcon,
  PhotoIcon,
  CurrencyDollarIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'

const navItems = [
  { path: '/admin', icon: <Squares2X2Icon className="w-5 h-5" />, label: 'Dashboard' },
  { path: '/admin/users', icon: <UsersIcon className="w-5 h-5" />, label: 'Users' },
  { path: '/admin/activities', icon: <TicketIcon className="w-5 h-5" />, label: 'Activities' },
  { path: '/admin/categories', icon: <TagIcon className="w-5 h-5" />, label: 'Categories' },
  { path: '/admin/banners', icon: <PhotoIcon className="w-5 h-5" />, label: 'Banners' },
  { path: '/admin/promos', icon: <CurrencyDollarIcon className="w-5 h-5" />, label: 'Promos' },
]

export default function AdminNavbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <Link to="/admin" className="flex items-center">
              <span className="font-serif text-xl font-bold text-primary">
                TravelAku Admin
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <ArrowLeftOnRectangleIcon className="mr-2 w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 